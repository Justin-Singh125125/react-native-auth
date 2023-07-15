import axios, { AxiosInstance } from 'axios';
import { GetItemsResponse } from './api.types';

class Api {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'localhost:8000',
    });
  }

  getItems() {
    return this.instance.get<GetItemsResponse>('/items');
  }
}

export const api = new Api();
