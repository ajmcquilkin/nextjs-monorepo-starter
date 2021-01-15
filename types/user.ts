import { Action } from './action';

export interface User {
  netid: string,
  email: string,
  fullName: string,
  classYear: number
}

export interface UserState {
  users: { [id: string]: User },
  user: string | null,
  isAuthenticated: boolean,
}

export enum UserActionTypes {
  AUTH_USER = 'AUTH_USER',
  DEAUTH_USER = 'DEAUTH_USER'
}
