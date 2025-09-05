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
import styles from './App.module.css';

enum AIStatus {
  NOT_LOADED = 'Not loaded',
  LOADING = 'Loading model...',
  LOADED = 'Model loaded!',
  ERROR = 'Error loading model',
  GENERATING = 'Generating...',
}

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(
    'A small confirmation modal with a title, text, and an "OK" button.'
  );
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<AIStatus>(AIStatus.NOT_LOADED);

  useEffect(() => {
    const initializeAI = async (): Promise<void> => {
      setStatus(AIStatus.LOADING);
      console.log('Initializing AI model...');

      try {
        const response = await window.api.loadModel();
        console.log('window.api.loadModel() response:', response);
        if (response.success) {
          setStatus(AIStatus.LOADED);
          console.log('AI model initialized successfully!');
        } else {
          throw new Error(response.error || 'Unknown error loading model');
        }
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
        setStatus(AIStatus.ERROR);
      }
    };

    initializeAI();
  }, []);

  const handleGenerate = async (): Promise<void> => {
    console.log('Attempting to generate tokens.');
    console.log('Current status:', status);
    console.log('Current prompt:', prompt);

    if (status !== AIStatus.LOADED || !prompt) {
      console.log('Pre-check failed: Model not ready or no prompt provided.');
      return;
    }

    setStatus(AIStatus.GENERATING);
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
      setStatus(AIStatus.LOADED);
    }
  };

  const isLoading = status === AIStatus.LOADING || status === AIStatus.GENERATING;

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
          <div className={styles.marginTop16}>
            <label htmlFor="prompt-textarea" className={styles.promptLabel}>
              Describe the component you are creating:
            </label>
            <InputText
              type="text"
              id="prompt-textarea"
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setPrompt(event.target.value)}
            />
          </div>
          <div className={styles.marginTop16}>
            <Button onClick={handleGenerate} disabled={isLoading} type="tertiary">
              {isLoading ? 'Loading...' : '✨ Generate Tokens'}
            </Button>
          </div>
          <div className={styles.marginTop24}>
            <h2>AI Response:</h2>
            <pre className={styles.responsePre}>
              <code>{output || 'Output will appear here...'}</code>
            </pre>
          </div>
        </Layout>
      </ModalProvider>
    </ColorSchemeProvider>
  );
};

export default App;
