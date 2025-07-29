import { useState, useEffect } from 'react';
import {
  InputText,
  Button,
  ColorSchemeProvider,
  ColorSchemeSwitcher,
  ModalProvider
} from 'fratch-ui';
import SetTokenAI from './components/SetTokenAI';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(
    'A small confirmation modal with a title, text, and an "OK" button.'
  );
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<string>('Not loaded');

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
      <ModalProvider>
        <Layout>
          <h1>AI Design Token Builder</h1>
          <ColorSchemeSwitcher />
          <hr />
          <SetTokenAI />
          <hr />
          <p>
            <strong>Status:</strong> {status}
          </p>
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
        </Layout>
      </ModalProvider>
    </ColorSchemeProvider>
  );
};

export default App;
