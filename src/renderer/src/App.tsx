import React, { useState, useEffect } from 'react';

// --- CONFIGURACIÓN DE LA IA ---
// El prompt de sistema que le da a la IA su rol y sus reglas.
const SYSTEM_PROMPT = `
<|system|>
You are an expert design system assistant. Your task is to generate a list of design token names for a UI component described by the user.
You must use the GitHub Primer naming convention.
Your response MUST be only a JSON array of strings (e.g., ["token1", "token2", ...]). Do not include any other text, explanations, or markdown.
<|end|>
`;
// --- FIN DE LA CONFIGURACIÓN ---

const App: React.FC = () => {
  // Estados para la interfaz de usuario
  const [prompt, setPrompt] = useState<string>(
    'A small confirmation modal with a title, text, and an "OK" button.'
  );
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<string>('Not loaded');

  // Este useEffect se ejecuta una sola vez para cargar el modelo de IA al iniciar la aplicación.
  useEffect(() => {
    const initializeAI = async () => {
      setStatus('Loading model...');
      console.log('Initializing AI model...');

      try {
        // Call the main process to load the model
        const response = await window.api.loadModel();
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
  }, []); // El array vacío `[]` asegura que esto solo se ejecute al montar el componente.

  // Esta función se llama al hacer clic en el botón "Generar".
  const handleGenerate = async () => {
    if (status !== 'Model loaded' || !prompt) {
      console.log('Model not ready or no prompt provided.');
      return;
    }

    setStatus('Generating...');
    setOutput('');

    try {
      // Combinamos el prompt de sistema con el del usuario para guiar a la IA
      const fullPrompt = `${SYSTEM_PROMPT}<|user|>${prompt}<|end|><|assistant|>`;

      // Call the main process to generate tokens
      const response = await window.api.generateTokens(fullPrompt);

      if (response.success && response.tokens) {
        setOutput(JSON.stringify(response.tokens, null, 2));
      } else {
        throw new Error(response.error || 'Unknown error generating tokens');
      }
    } catch (error) {
      console.error('Error during generation:', error);
      setOutput('An error occurred during generation.');
    } finally {
      setStatus('Model loaded!'); // Devolvemos el estado a "listo"
    }
  };

  const isLoading = status.includes('Loading') || status === 'Generating...';

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>AI Design Token Builder</h1>
      <p>
        <strong>Status:</strong> {status}
      </p>

      <div style={{ marginTop: '16px' }}>
        <label htmlFor="prompt-textarea" style={{ display: 'block', marginBottom: '8px' }}>
          Describe el componente que estás creando:
        </label>
        {/* Reemplazar con <Textarea> de fratch-ui */}
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', minHeight: '80px', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginTop: '16px' }}>
        {/* Reemplazar con <Button> de fratch-ui */}
        <button onClick={handleGenerate} disabled={isLoading} style={{ padding: '10px 15px' }}>
          {isLoading ? 'Cargando...' : '✨ Generar Tokens'}
        </button>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h2>Respuesta de la IA:</h2>
        <pre
          style={{
            background: '#f0f0f0',
            padding: '16px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        >
          <code>{output || 'La salida aparecerá aquí...'}</code>
        </pre>
      </div>
    </div>
  );
};

export default App;