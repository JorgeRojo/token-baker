import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { checkApiConnection, generateTokens, getDecryptedApiKey, saveApiKey } from './ai';
import { ERROR_MESSAGES, LOG_MESSAGES } from './constants';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    title: 'Token Baker',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle('save-api-key', async (_event, apiKey: string) => {
    try {
      await saveApiKey(apiKey);
      console.log('API Key saved to store!');
      return { success: true };
    } catch (error: unknown) {
      console.error('Failed to save API Key:', error);
      return { success: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('get-api-key', async () => {
    try {
      const apiKey = await getDecryptedApiKey();
      if (apiKey) {
        return { success: true, apiKey };
      } else {
        return { success: false, error: 'No API Key found in store.' };
      }
    } catch (error: unknown) {
      console.error('Failed to get API Key:', error);
      return { success: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('load-model', async () => {
    console.log(LOG_MESSAGES.IPC_LOAD_MODEL_RECEIVED);
    try {
      const apiKey = await getDecryptedApiKey();
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.GEMINI_API_KEY_NOT_CONFIGURED);
      }
      await checkApiConnection(apiKey);
      console.log(LOG_MESSAGES.IPC_MODEL_LOADED_SUCCESSFULLY);
      return { success: true };
    } catch (error: unknown) {
      console.error(ERROR_MESSAGES.IPC_FAILED_TO_LOAD_MODEL, error);
      return { success: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('generate-tokens', async (_event, prompt: string) => {
    try {
      const apiKey = await getDecryptedApiKey();
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.GEMINI_API_KEY_NOT_CONFIGURED);
      }
      const tokens = await generateTokens(prompt, apiKey);
      return { success: true, tokens };
    } catch (error: unknown) {
      console.error(ERROR_MESSAGES.FAILED_TO_GENERATE_TOKENS_MAIN_PROCESS, error);
      return { success: false, error: (error as Error).message };
    }
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
