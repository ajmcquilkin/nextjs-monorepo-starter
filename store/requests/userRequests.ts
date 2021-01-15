import { AxiosResponse } from 'axios';
import { createBackendAxiosRequest } from 'store/requests';

// eslint-disable-next-line import/prefer-default-export
export const validateUserRequest = <D = any>() => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/auth/user'
});
