import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { requestTimeout } from 'utils';

export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<D>> => axios({
  baseURL: `${__APP_URL__}/api/`,
  timeout: requestTimeout,
  withCredentials: true,

  ...config
});
