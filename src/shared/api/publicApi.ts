import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

export function createPublicApiService(
  config?: CreateAxiosDefaults
): AxiosInstance {
  return axios.create({
    baseURL: 'https://ib.mrbelka12000.com',
    timeout: 30000,
    ...config
  });
}