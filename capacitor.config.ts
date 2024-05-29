import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'cafi.icfashion.com',
  appName: 'Easywear To Buy',
  webDir: 'www',
  bundledWebRuntime: false,

  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  },
};

export default config;
