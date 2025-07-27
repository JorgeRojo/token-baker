import { useState, useEffect } from 'react';
import {
  InputText,
  Button,
  ColorSchemeProvider,
  ColorSchemeSwitcher,
  LeftLabeledField,
  IconCheck
} from 'fratch-ui';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(
    'A small confirmation modal with a title, text, and an "OK" button.'
  );
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<string>('Not loaded');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyStatus, setApiKeyStatus] = useState<string>('');

  useEffect(() => {
    const loadApiKey = async (): Promise<void> => {
      try {
        const response = await window.api.getApiKey();
        if (response.success && response.apiKey) {
          setApiKey(response.apiKey);
          setApiKeyStatus('API Key loaded successfully.');
        } else if (response.error) {
          setApiKeyStatus(`Error loading API Key: ${response.error}`);
        } else {
          setApiKeyStatus('No API Key found. Please enter one.');
        }
      } catch (error) {
        setApiKeyStatus(`Error loading API Key: ${(error as Error).message}`);
      }
    };

    loadApiKey();

    const initializeAI = async (): Promise<void> => {
      setStatus('Loading model...');
      console.log('Initializing AI model...');

      try {
        const response = await window.api.loadModel();
        console.log('window.api.loadModel() response:', response);
        if (response.success) {
          setStatus('Model loaded!');
          console.log('AI model initialized successfully!');
        } else {
          throw new Error(response.error || 'Unknown error loading model');
        }
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
        setStatus('Error loading model');
      }
    };

    initializeAI();
  }, []);

  const handleSaveApiKey = async (): Promise<void> => {
    if (!apiKey) {
      setApiKeyStatus('API Key cannot be empty.');
      return;
    }
    try {
      const response = await window.api.saveApiKey(apiKey);
      if (response.success) {
        setApiKeyStatus('API Key saved successfully!');
      } else {
        setApiKeyStatus(`Error saving API Key: ${response.error}`);
      }
    } catch (error) {
      setApiKeyStatus(`Error saving API Key: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    const initializeAI = async (): Promise<void> => {
      setStatus('Loading model...');
      console.log('Initializing AI model...');

      try {
        const response = await window.api.loadModel();
        console.log('window.api.loadModel() response:', response);
        if (response.success) {
          setStatus('Model loaded!');
          console.log('AI model initialized successfully!');
        } else {
          throw new Error(response.error || 'Unknown error loading model');
        }
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
        setStatus('Error loading model');
      }
    };

    initializeAI();
  }, []);

  const handleGenerate = async (): Promise<void> => {
    console.log('Attempting to generate tokens.');
    console.log('Current status:', status);
    console.log('Current prompt:', prompt);

    if (status !== 'Model loaded!' || !prompt) {
      console.log('Pre-check failed: Model not ready or no prompt provided.');
      return;
    }

    setStatus('Generating...');
    setOutput('');

    try {
      const response = await window.api.generateTokens(prompt);

      if (response.success && response.tokens) {
        setOutput(JSON.stringify(response.tokens, null, 2));
      } else {
        throw new Error(response.error || 'Unknown error generating tokens');
      }
    } catch (error) {
      console.error('Error during generation:', error);
      setOutput('An error occurred during generation.');
    } finally {
      setStatus('Model loaded!');
    }
  };

  const isLoading = status.includes('Loading') || status === 'Generating...';

  return (
    <ColorSchemeProvider>
      <h1>AI Design Token Builder</h1>
      <ColorSchemeSwitcher />
      <p>
        <strong>Status:</strong> {status}
      </p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1 }}>
          <LeftLabeledField
            label="Gemini API Key"
            field={
              <InputText
                type="password"
                id="gemini-api-key"
                value={apiKey}
                onChange={(event): void => setApiKey(event?.target?.value ?? '')}
                placeholder="Enter your Gemini API Key"
              />
            }
          />
        </div>
        <Button size="small" isRound Icon={IconCheck} onClick={handleSaveApiKey}>
          save
        </Button>
      </div>
      {apiKeyStatus && <p style={{ marginTop: '8px', fontSize: '0.9em' }}>{apiKeyStatus}</p>}
      <div style={{ marginTop: '16px' }}>
        <label htmlFor="prompt-textarea" style={{ display: 'block', marginBottom: '8px' }}>
          Describe the component you are creating:
        </label>
        <InputText
          type="text"
          id="prompt-textarea"
          value={prompt}
          onChange={(event): void => setPrompt(event?.target?.value ?? '')}
        />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={handleGenerate} disabled={isLoading} type="tertiary">
          {isLoading ? 'Loading...' : '✨ Generate Tokens'}
        </Button>
      </div>
      <div style={{ marginTop: '24px' }}>
        <h2>AI Response:</h2>
        <pre
          style={{
            background: '#f0f0f0',
            padding: '16px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        >
          <code>{output || 'Output will appear here...'}</code>
        </pre>
      </div>
    </ColorSchemeProvider>
  );
};

export default App;
