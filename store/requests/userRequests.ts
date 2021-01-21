import { AxiosResponse } from 'axios';
import { createBackendAxiosRequest } from 'store/requests';

export const validateUserRequest = <D>() => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/auth/user'
});
