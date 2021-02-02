import { createBackendAxiosRequest } from 'store/requests';
import { RequestReturnType } from 'types/state';

export const validateUserRequest = <D>(

): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/auth/user'
});
