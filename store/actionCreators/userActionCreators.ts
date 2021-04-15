import { UserActions } from 'types/user';

export const validateUser = (): UserActions => ({
  type: 'AUTH_USER',
  payload: {},
  status: 'REQUEST'
});

export const signOutUser = (): UserActions => ({
  type: 'DEAUTH_USER',
  payload: {},
  status: 'SUCCESS'
});
