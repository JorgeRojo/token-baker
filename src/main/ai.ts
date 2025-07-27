import { ERROR_MESSAGES, GEMINI_URL_BASE, SYSTEM_PROMPT, LOG_MESSAGES } from './constants';

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
    throw new Error(ERROR_MESSAGES.GEMINI_CONNECTION_TEST_FAILED((error as Error).message));
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
