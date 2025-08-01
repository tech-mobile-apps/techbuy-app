// Configuração global para resolver imports
global.__DEV__ = true;
global.__EXPO_ROUTER_APP_ROOT = './app';

// Mock do React Native
global.__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModuleConfig: [],
};

// Mock completo do React Native
jest.mock('react-native', () => {
  const React = require('react');
  return {
    View: ({ children, ...props }) => React.createElement('div', props, children),
    Text: ({ children, ...props }) => React.createElement('span', props, children),
    ScrollView: ({ children, ...props }) => React.createElement('div', props, children),
    TouchableOpacity: ({ children, onPress, ...props }) =>
      React.createElement('button', { onClick: onPress, ...props }, children),
    Image: (props) => React.createElement('img', props),
    Platform: {
      OS: 'web',
      select: (platforms) => platforms.web || platforms.default,
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    StatusBar: {
      setBarStyle: jest.fn(),
      setHidden: jest.fn(),
    },
    StyleSheet: {
      create: (styles) => styles,
      flatten: (styles) => styles,
    },
  };
});

// Import do jest-native após definir as variáveis globais
try {
  require('@testing-library/jest-native/extend-expect');
} catch (error) {
  console.warn('jest-native not available, skipping...');
}

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock do expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        apiUrl: 'http://localhost:3001',
      },
    },
  },
}));

// Mock do expo-linking
jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
  openURL: jest.fn(),
}));

// Mock do expo-clipboard
jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
  getStringAsync: jest.fn(),
}));

// Mock do expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock do react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock do react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {});

// Mock do react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const Svg = ({ children, ...props }) => React.createElement('svg', props, children);
  return {
    Svg,
    Circle: ({ ...props }) => React.createElement('circle', props),
    Rect: ({ ...props }) => React.createElement('rect', props),
    Path: ({ ...props }) => React.createElement('path', props),
    G: ({ children, ...props }) => React.createElement('g', props, children),
  };
});

// Mock do uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

// Mock do React Native Paper
jest.mock('react-native-paper', () => {
  const React = require('react');

  const Card = ({ children, ...props }) => React.createElement('div', props, children);
  Card.Content = ({ children, ...props }) => React.createElement('div', props, children);

  return {
    Button: ({ children, onPress, ...props }) =>
      React.createElement('button', { onClick: onPress, ...props }, children),
    Text: ({ children, ...props }) => React.createElement('span', props, children),
    Card,
    Title: ({ children, ...props }) => React.createElement('h2', props, children),
    Paragraph: ({ children, ...props }) => React.createElement('p', props, children),
    IconButton: ({ onPress, ...props }) =>
      React.createElement('button', { onClick: onPress, ...props }),
    Provider: ({ children }) => children,
    DefaultTheme: {},
  };
});

// Mock do axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Suprimir warnings do react-test-renderer deprecated
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('react-test-renderer is deprecated')) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('react-test-renderer is deprecated')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Configuração global para testes
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};
