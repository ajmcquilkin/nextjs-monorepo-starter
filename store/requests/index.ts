import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendUrl, requestTimeout } from 'utils';

const backendAxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: requestTimeout,
  withCredentials: true,
});

// eslint-disable-next-line import/prefer-default-export
export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<D>> => backendAxiosInstance({
  ...config,
  timeout: requestTimeout
});
