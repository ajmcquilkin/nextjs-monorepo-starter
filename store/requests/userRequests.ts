import { createBackendAxiosRequest } from 'store/requests';
import { hasField, hasKey, isValidObject } from 'types/generic';
import { RequestReturnType } from 'types/state';
import { AuthUserData } from 'types/user';

export const validateUserRequest = async (

): Promise<RequestReturnType<AuthUserData>> => {
  const result = await createBackendAxiosRequest({
    method: 'GET',
    url: '/auth/user'
  });

  if (!isValidObject(result.data.data)) throw new Error('Invalid API Response [Object]');

  if (!hasField(result.data.data, 'isAuthenticated', 'boolean')) throw new Error('Invalid API Response [Non-existent Field]');
  if (!hasField(result.data.data, 'isReviewer', 'boolean')) throw new Error('Invalid API Response [Non-existent Field]');
  if (!hasField(result.data.data, 'isStaff', 'boolean')) throw new Error('Invalid API Response [Non-existent Field]');
  if (!hasField(result.data.data, 'name', 'string')) throw new Error('Invalid API Response [Non-existent Field]');

  if (!hasKey(result.data.data, 'netId')) throw new Error('Invalid API Response [Non-existent Field]');
  if (result.data.data.netId !== null && typeof result.data.data.netId !== 'string') throw new Error('Invalid API Response [Bad field value]');

  return result as RequestReturnType<AuthUserData>;
};
