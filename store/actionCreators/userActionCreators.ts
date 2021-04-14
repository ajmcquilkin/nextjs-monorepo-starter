import { UserActions } from 'types/user';

export const validateUser = (): UserActions => ({
  type: 'AUTH_USER_REQUEST',
  payload: {}
});

export const signOutUser = (): UserActions => ({
  type: 'DEAUTH_USER',
  payload: {}
});
