import axios, { AxiosRequestConfig } from 'axios';
import { requestTimeout } from 'utils/constants';
import { RequestReturnType } from 'types/state';

export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig
): Promise<RequestReturnType<D>> => axios({
  baseURL: `${__APP_URL__}/api/`,
  timeout: requestTimeout,
  withCredentials: true,
  ...config
});
