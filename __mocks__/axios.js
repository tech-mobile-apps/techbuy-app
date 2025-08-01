const axiosInstance = {
  defaults: {
    baseURL: 'https://server-c610.onrender.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  interceptors: {
    request: {
      use: jest.fn(() => 1), // Mock que retorna um ID do interceptor
      handlers: [{ fulfilled: jest.fn(), rejected: jest.fn() }],
    },
    response: {
      use: jest.fn(() => 1), // Mock que retorna um ID do interceptor
      handlers: [{ fulfilled: jest.fn(), rejected: jest.fn() }],
    },
  },
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
};

const axios = {
  create: jest.fn(() => axiosInstance),
  ...axiosInstance,
};

export default axios;
