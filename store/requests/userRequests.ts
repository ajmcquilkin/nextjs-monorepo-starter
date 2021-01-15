import { AxiosResponse } from 'axios';
import { createBackendAxiosRequest } from 'store/requests';

// TODO: Update response types (currently "any")

// eslint-disable-next-line import/prefer-default-export
export const validateUserRequest = () => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'GET',
  url: '/auth/user'
});
