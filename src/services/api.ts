import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';

export const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // у меня лезет ошибка, если использую config: AxiosRequestConfig - поэтому пока убрала этот тип
  //как лучше сделать?
  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
