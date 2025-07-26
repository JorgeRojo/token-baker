import { ColorSchemeProvider, ColorSchemeSwitcher } from 'fratch-ui'
import Versions from './components/Versions'

const App: React.FC = () => {
  return (
    <ColorSchemeProvider>
      <div>
        <ColorSchemeSwitcher />
        <h1>Token Baker</h1>
        <p>
          ✨ Accelerate your design system workflow. An AI-powered editor that helps you build,
          manage, and refine your design tokens from a simple prompt.
        </p>
        <Versions />
      </div>
    </ColorSchemeProvider>
  )
}

export default App
