import { safeStorage } from 'electron';
import storage from 'electron-json-storage';
import { promisify } from 'util';
import {
  API_KEY_STORE_KEY,
  ERROR_MESSAGES,
  GEMINI_URL_BASE,
  LOG_MESSAGES,
  SYSTEM_PROMPT
} from './constants';

// Promisify storage functions for async/await usage
const storageGet = promisify(storage.get);
const storageSet = promisify(storage.set);

export const getDecryptedApiKey = async (): Promise<string | null> => {
  try {
    if (!safeStorage.isEncryptionAvailable()) {
      // If encryption is not available, we cannot decrypt a key.
      return null;
    }

    // Retrieve data from storage
    const data = await storageGet(API_KEY_STORE_KEY);

    // Check if data is a valid string to decrypt
    if (data && typeof data === 'string') {
      return safeStorage.decryptString(Buffer.from(data, 'hex'));
    }

    // Return null if no key is found or data is invalid
    return null;
  } catch (error) {
    // It's safer to return null and log the error than to throw
    console.error('Failed to retrieve API key:', error);
    return null;
  }
};

export async function saveApiKey(apiKey: string): Promise<void> {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error('Encryption is not available on this system.');
  }
  const encryptedKey = safeStorage.encryptString(apiKey).toString('hex');
  // Wait for the promisified set operation to complete
  await storageSet(API_KEY_STORE_KEY, encryptedKey);
}

export async function checkApiConnection(apiKey: string): Promise<void> {
  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.GEMINI_API_KEY_NOT_CONFIGURED);
  }

  console.log(LOG_MESSAGES.VERIFYING_GEMINI_CONNECTION);

  try {
    const response = await fetch(`${GEMINI_URL_BASE}${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'hello' }] }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || response.statusText;
      throw new Error(ERROR_MESSAGES.GEMINI_CONNECTION_FAILED(response.status, errorMessage));
    }

    console.log(LOG_MESSAGES.GEMINI_CONNECTION_SUCCESS);
  } catch (error) {
    console.error(LOG_MESSAGES.ERROR_VERIFYING_CONNECTION, error);
    throw new Error(
      ERROR_MESSAGES.GEMINI_CONNECTION_TEST_FAILED(
        error instanceof Error ? error.message : String(error)
      )
    );
  }
}

export async function generateTokens(userPrompt: string, apiKey: string): Promise<string[]> {
  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.GEMINI_API_KEY_NOT_CONFIGURED);
  }

  console.log(LOG_MESSAGES.GENERATING_TOKENS(userPrompt));

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nUser prompt: "${userPrompt}"` }]
      }
    ]
  };

  try {
    const response = await fetch(`${GEMINI_URL_BASE}${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || response.statusText;
      throw new Error(ERROR_MESSAGES.GEMINI_ERROR(response.status, errorMessage));
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error(ERROR_MESSAGES.API_EMPTY_OR_INVALID_RESPONSE);
    }

    console.log(LOG_MESSAGES.RAW_AI_RESPONSE, generatedText);

    try {
      const cleanedText = generatedText.replace(/```json\n|```/g, '').trim();
      const tokens = JSON.parse(cleanedText);
      if (Array.isArray(tokens)) {
        return tokens;
      } else {
        throw new Error(ERROR_MESSAGES.AI_RESPONSE_NOT_VALID_JSON_ARRAY);
      }
    } catch {
      console.error(LOG_MESSAGES.FAILED_TO_PARSE_AI_RESPONSE, generatedText);
      throw new Error(ERROR_MESSAGES.AI_RESPONSE_NOT_VALID_JSON_ARRAY_REPHRASE);
    }
  } catch (error) {
    console.error(ERROR_MESSAGES.GEMINI_GENERATE_TOKENS_ERROR, error);
    throw error;
  }
}
