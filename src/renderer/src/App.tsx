import { useState } from 'react'
import { Button, ColorSchemeProvider, ColorSchemeSwitcher } from 'fratch-ui'
import Versions from './components/Versions'

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleGenerateTokens = async () => {
    setLoading(true)
    try {
      const tokens = await window.api.generateTokens(prompt)
      setGeneratedTokens(tokens)
    } catch (error) {
      console.error('Error generating tokens:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ColorSchemeProvider>
      <div>
        <ColorSchemeSwitcher />
        <h1>Token Baker</h1>
        <p>
          ✨ Accelerate your design system workflow. An AI-powered editor that helps you build,
          manage, and refine your design tokens from a simple prompt.
        </p>
        <div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a UI component (e.g., primary button)"
            style={{ width: '300px', padding: '8px', marginRight: '8px' }}
          />
          <Button onClick={handleGenerateTokens} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Tokens'}
          </Button>
        </div>
        {generatedTokens.length > 0 && (
          <div>
            <h2>Generated Tokens:</h2>
            <ul>
              {generatedTokens.map((token, index) => (
                <li key={index}>{token}</li>
              ))}
            </ul>
          </div>
        )}
        <Versions />
      </div>
    </ColorSchemeProvider>
  )
}

export default App
