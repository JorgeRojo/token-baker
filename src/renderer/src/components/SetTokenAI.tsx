import { useState, useEffect } from 'react';
import { InputText, Button, LeftLabeledField, IconPlay } from 'fratch-ui';

const SetTokenAI: React.FC = () => {
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

  return (
    <>
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
        <Button size="small" Icon={IconPlay} onClick={handleSaveApiKey}>
          save
        </Button>
      </div>
      {apiKeyStatus && <p style={{ marginTop: '8px', fontSize: '0.9em' }}>{apiKeyStatus}</p>}
    </>
  );
};

export default SetTokenAI;
