import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';

export const ApiConfig = {
  BackendUrl: 'https://15.design.htmlacademy.pro/six-cities',
  RequestTimeout: 5000,
} as const;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiConfig.BackendUrl,
    timeout: ApiConfig.RequestTimeout,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};
