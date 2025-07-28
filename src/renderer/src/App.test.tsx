import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, vi, expect } from 'vitest';

// Mock the fratch-ui module
vi.mock('fratch-ui', () => ({
  InputText: vi.fn(() => <input data-testid="mock-input" />),
  Button: vi.fn(() => <button data-testid="mock-button" />),
  ColorSchemeProvider: vi.fn(({ children }) => <div>{children}</div>),
  ColorSchemeSwitcher: vi.fn(() => <div data-testid="mock-color-scheme-switcher" />),
  ModalProvider: vi.fn(({ children }) => <div>{children}</div>),
  LeftLabeledField: vi.fn(() => <div data-testid="mock-left-labeled-field" />),
  IconPlay: vi.fn(() => <svg data-testid="mock-icon-play" />)
}));

// Mock window.api
Object.defineProperty(window, 'api', {
  value: {
    loadModel: vi.fn(() => Promise.resolve({ success: true })),
    generateTokens: vi.fn(() => Promise.resolve({ success: true, tokens: {} }))
  },
  writable: true,
  configurable: true
});

describe('App', () => {
  it('should render the App component', () => {
    render(<App />);
    expect(screen.getByText('AI Design Token Builder')).toBeInTheDocument();
  });
});
