import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendUrl, requestTimeout } from 'utils';

const backendAxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: requestTimeout,
  withCredentials: true,
});

// eslint-disable-next-line import/prefer-default-export
export const createBackendAxiosRequest = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => backendAxiosInstance({
  ...config,
  timeout: requestTimeout
});
