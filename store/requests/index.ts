import axios, { AxiosRequestConfig } from 'axios';
import { RequestReturnType } from 'types/state';
import { requestTimeout } from 'utils';

export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig
): Promise<RequestReturnType<D>> => axios({
  baseURL: `${__APP_URL__}/api/`,
  timeout: requestTimeout,
  withCredentials: true,
  ...config
});
