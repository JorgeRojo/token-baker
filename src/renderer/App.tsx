import React from "react";
import { Button, ColorSchemeProvider, ColorSchemeSwitcher } from "fratch-ui";

export const App: React.FC = () => {
  return (
    <ColorSchemeProvider>
      <div>
        <ColorSchemeSwitcher />
        <h1>Design Tokens Builder</h1>
        <p>The application has started successfully with React.</p>
        <Button type="tertiary">Fratch-UI Button</Button>
      </div>
    </ColorSchemeProvider>
  );
};
