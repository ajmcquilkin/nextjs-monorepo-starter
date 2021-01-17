import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendUrl, requestTimeout } from 'utils';

const backendAxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: requestTimeout,
  withCredentials: true,
});

export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<D>> => backendAxiosInstance(config);
