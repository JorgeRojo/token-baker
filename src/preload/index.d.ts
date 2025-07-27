import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      generateTokens: (
        prompt: string
      ) => Promise<{ success: boolean; tokens?: string[]; error?: string }>;
      loadModel: () => Promise<{ success: boolean; error?: string }>;
    };
  }
}
