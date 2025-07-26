import { Button, ColorSchemeProvider, ColorSchemeSwitcher } from 'fratch-ui'
import Versions from './components/Versions'

const App: React.FC = () => {
  return (
    <ColorSchemeProvider>
      <div>
        <ColorSchemeSwitcher />
        <h1>Design Tokens Builder</h1>
        <p>The application has started successfully with React.</p>
        <Button type="tertiary">Fratch-UI Button</Button>
        <Versions />
      </div>
    </ColorSchemeProvider>
  )
}

export default App
