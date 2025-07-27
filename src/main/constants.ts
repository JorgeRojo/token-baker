export const ERROR_MESSAGES = {
  GEMINI_API_KEY_NOT_CONFIGURED_ENV: 'The Google API Key is not configured.',
  GEMINI_CONNECTION_FAILED: (status: number, message: string) =>
    `Failed to connect to Google API: ${status} - ${message}`,
  GEMINI_CONNECTION_TEST_FAILED: (message: string) =>
    `Connection test failed. Original error: ${message}`,
  GEMINI_API_KEY_NOT_CONFIGURED: 'The Google API Key is not configured.',
  API_EMPTY_OR_INVALID_RESPONSE: 'The API returned an empty or invalid response.',
  AI_RESPONSE_NOT_VALID_JSON_ARRAY: 'The AI response was not a valid JSON array.',
  AI_RESPONSE_NOT_VALID_JSON_ARRAY_REPHRASE:
    'The AI did not return a valid JSON array. Please try rephrasing your prompt.',
  GEMINI_ERROR: (status: number, message: string) => `Google API Error: ${status} - ${message}`,
  GEMINI_GENERATE_TOKENS_ERROR: 'Error generating tokens from Google API:',
  IPC_FAILED_TO_LOAD_MODEL: 'IPC: Failed to load model:',
  FAILED_TO_GENERATE_TOKENS_MAIN_PROCESS: 'Failed to generate tokens in main process:'
};

export const LOG_MESSAGES = {
  VERIFYING_GEMINI_CONNECTION: 'Verifying connection with Google Gemini API...',
  GEMINI_CONNECTION_SUCCESS: 'Connection with Google Gemini API verified successfully!',
  ERROR_VERIFYING_CONNECTION: 'Error during connection verification:',
  GENERATING_TOKENS: (prompt: string) =>
    `Generating tokens with Google Gemini for prompt: "${prompt}"`,
  RAW_AI_RESPONSE: 'Raw AI response:',
  FAILED_TO_PARSE_AI_RESPONSE: 'Failed to parse AI response as JSON:',
  IPC_LOAD_MODEL_RECEIVED: 'IPC: load-model received.',
  IPC_MODEL_LOADED_SUCCESSFULLY: 'IPC: Model loaded successfully.'
};

export const GEMINI_URL_BASE =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=';

export const SYSTEM_PROMPT = `You are an expert design system assistant. Your task is to generate a list of design token names for a UI component described by the user. You must use the GitHub Primer naming convention. Your response MUST be only a JSON array of strings (e.g., ["token1", "token2", ...]). Do not include any other text, explanations, or markdown.`;
