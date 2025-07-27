import 'dotenv/config';
import axios from 'axios';
import { ERROR_MESSAGES, GEMINI_URL_BASE, SYSTEM_PROMPT, LOG_MESSAGES } from './constants';

export async function checkApiConnection(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.GEMINI_API_KEY_NOT_CONFIGURED_ENV);
  }

  console.log(LOG_MESSAGES.VERIFYING_GEMINI_CONNECTION);

  try {
    await axios.post(
      `${GEMINI_URL_BASE}${apiKey}`,
      {
        contents: [{ role: 'user', parts: [{ text: 'hello' }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log(LOG_MESSAGES.GEMINI_CONNECTION_SUCCESS);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.error?.message || error.message;
      throw new Error(ERROR_MESSAGES.GEMINI_CONNECTION_FAILED(error.response.status, errorMessage));
    }
    console.error(LOG_MESSAGES.ERROR_VERIFYING_CONNECTION, error);
    throw new Error(ERROR_MESSAGES.GEMINI_CONNECTION_TEST_FAILED((error as Error).message));
  }
}

export async function generateTokens(userPrompt: string): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;

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
    const response = await axios.post(`${GEMINI_URL_BASE}${apiKey}`, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });

    const data = response.data;
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
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.error?.message || error.message;
      throw new Error(ERROR_MESSAGES.GEMINI_ERROR(error.response.status, errorMessage));
    }
    console.error(ERROR_MESSAGES.GEMINI_GENERATE_TOKENS_ERROR, error);
    throw error;
  }
}
