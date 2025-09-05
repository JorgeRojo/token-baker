import { render, screen, fireEvent, waitFor, cleanup, RenderResult } from '@testing-library/react';
import App from '../App';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';

// Mock the fratch-ui module

vi.mock('fratch-ui', (): object => ({
  InputText: vi.fn(({ value, onChange }) => (
    <input data-testid="mock-input" value={value} onChange={onChange} />
  )),
  Button: vi.fn(({ onClick, disabled, children }) => (
    <button data-testid="mock-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )),
  ColorSchemeProvider: vi.fn(({ children }) => <div>{children}</div>),
  ColorSchemeSwitcher: vi.fn(() => <div data-testid="mock-color-scheme-switcher" />),
  ModalProvider: vi.fn(({ children }) => <div>{children}</div>),
  LeftLabeledField: vi.fn(() => <div data-testid="mock-left-labeled-field" />),
  IconPlay: vi.fn(() => <svg data-testid="mock-icon-play" />)
}));

// Stub window.api globally
const loadModelMock = vi.fn((): Promise<{ success: boolean; error?: string }> => Promise.resolve({ success: true }));
const generateTokensMock = vi.fn((): Promise<{ success: boolean; tokens?: string[]; error?: string }> =>
  Promise.resolve({ success: true, tokens: ['red'] })
);

vi.stubGlobal('api', {
  loadModel: loadModelMock,
  generateTokens: generateTokensMock
});

const setup = (): RenderResult => render(<App />);

describe('App', () => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render the App component and show initial status', (): void => {
    // Arrange
    setup();

    // Assert
    expect(screen.getByText('AI Design Token Builder')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
  });

  it('should load the model on mount and update status', async (): Promise<void> => {
    // Arrange
    setup();

    // Assert
    await waitFor(() => {
      expect(loadModelMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should show an error message if model loading fails', async (): Promise<void> => {
    // Arrange
    loadModelMock.mockResolvedValueOnce({ success: false, error: 'Model not found' });
    setup();

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Error loading model')).toBeInTheDocument();
    });
  });

  it('should generate tokens when the button is clicked', async (): Promise<void> => {
    // Arrange
    setup();
    await screen.findByText('Model loaded!'); // Use findByText for async waiting
    const generateButton = screen.getByRole('button', { name: '✨ Generate Tokens' });

    // Act
    fireEvent.click(generateButton);

    // Assert
    await waitFor(() => {
      expect(generateTokensMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/red/)).toBeInTheDocument();
      expect(screen.getByText('Model loaded!')).toBeInTheDocument();
    });
  });

  it('should show an error message if token generation fails', async (): Promise<void> => {
    // Arrange
    generateTokensMock.mockResolvedValueOnce({ success: false, error: 'Generation failed' });
    setup();
    await screen.findByText('Model loaded!'); // Use findByText for async waiting
    const generateButton = screen.getByRole('button', { name: '✨ Generate Tokens' });

    // Act
    fireEvent.click(generateButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('An error occurred during generation.')).toBeInTheDocument();
    });
  });

  it('should disable the generate button while loading', async (): Promise<void> => {
    // Arrange
    setup();
    // Wait for the model to load and the button to become enabled initially
    await screen.findByText('Model loaded!');
    const generateButton = screen.getByRole('button', { name: '✨ Generate Tokens' });
    expect(generateButton).not.toBeDisabled();

    // Act - Simulate clicking the button to trigger loading state
    fireEvent.click(generateButton);

    // Assert - Check if the button is disabled and shows "Loading..."
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled();
    });

    // Assert - Wait for generation to complete and button to be enabled again
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '✨ Generate Tokens' })).not.toBeDisabled();
    });
  });
});
