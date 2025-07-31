import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Opção para usar a fake-api localmente
// const getBaseUrl = () => {
//   if (Platform.OS === 'web') {
//     return 'http://localhost:5001';
//   }

//   // Substitua pela url gerada pelo ngrok
//   return 'https://63b35b1f6b94.ngrok-free.app';
// };

// Opção para usar a fake-api hospedada no render.com
const getBaseUrl = () => 'https://server-c6lo.onrender.com';

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona logs detalhados para debug
api.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      config: error.config,
    });

    if (error.code === 'ECONNABORTED') {
      console.error('Conexão expirou. Verifique se o servidor está rodando.');
    } else if (error.message === 'Network Error') {
      console.error('Erro de rede. Verifique sua conexão e se o servidor está rodando.');
    }

    return Promise.reject(error);
  },
);
