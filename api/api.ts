import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { GetItemsResponse } from './api.types';
import { TokenResponse } from 'expo-auth-session';

class Api {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000',
    });
  }

  setDefaultAccessToken(accessToken: TokenResponse['accessToken']) {
    this.instance.defaults.headers.common['Authorization'] = accessToken;
  }

  setConfigAccessToken(
    config: InternalAxiosRequestConfig,
    accessToken: TokenResponse['accessToken']
  ) {
    config.headers['Authorization'] = accessToken;
  }

  getItems() {
    return this.instance.get<GetItemsResponse>('/items');
  }
}

export const api = new Api();
