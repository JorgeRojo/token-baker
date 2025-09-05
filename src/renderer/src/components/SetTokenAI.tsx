import { useState, useEffect } from 'react';
import { InputText, Button, LeftLabeledField, IconPlay } from 'fratch-ui';
import styles from './SetTokenAI.module.css';

enum ApiKeyStatusMessage {
  LOADED = 'API Key loaded successfully.',
  NOT_FOUND = 'No API Key found. Please enter one.',
  EMPTY = 'API Key cannot be empty.',
  SAVED = 'API Key saved successfully!'
}

const SetTokenAI: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyStatus, setApiKeyStatus] = useState<string>('');

  useEffect(() => {
    const loadApiKey = async (): Promise<void> => {
      try {
        const response = await window.api.getApiKey();
        if (response.success && response.apiKey) {
          setApiKey(response.apiKey);
          setApiKeyStatus(ApiKeyStatusMessage.LOADED);
        } else if (response.error) {
          setApiKeyStatus(`Error loading API Key: ${response.error}`);
        } else {
          setApiKeyStatus(ApiKeyStatusMessage.NOT_FOUND);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setApiKeyStatus(`Error loading API Key: ${message}`);
      }
    };

    loadApiKey();
  }, []);

  const handleSaveApiKey = async (): Promise<void> => {
    if (!apiKey) {
      setApiKeyStatus(ApiKeyStatusMessage.EMPTY);
      return;
    }

    try {
      const response = await window.api.saveApiKey(apiKey);
      if (response.success) {
        setApiKeyStatus(ApiKeyStatusMessage.SAVED);
      } else {
        setApiKeyStatus(`Error saving API Key: ${response.error}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setApiKeyStatus(`Error saving API Key: ${message}`);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <LeftLabeledField
            label="Gemini API Key"
            field={
              <InputText
                type="password"
                id="gemini-api-key"
                value={apiKey}
                onChange={(event?: React.ChangeEvent<HTMLInputElement>): void =>
                  setApiKey(event?.target.value ?? '')
                }
                placeholder="Enter your Gemini API Key"
              />
            }
          />
        </div>
        <Button size="small" Icon={IconPlay} onClick={handleSaveApiKey}>
          save
        </Button>
      </div>
      {apiKeyStatus && <p className={styles.statusMessage}>{apiKeyStatus}</p>}
    </>
  );
};

export default SetTokenAI;
