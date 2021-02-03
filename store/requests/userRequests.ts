import { createBackendAxiosRequest } from 'store/requests';
import { RequestReturnType } from 'types/state';
import { AuthUserData } from 'types/user';

export const validateUserRequest = (

): Promise<RequestReturnType<AuthUserData>> => createBackendAxiosRequest({
  method: 'GET',
  url: '/auth/user'
});
