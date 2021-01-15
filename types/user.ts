import { GenericPair } from './generic';
import { Action } from './state';

/* -------- Generic -------- */

export interface User {
  netid: string,
  email: string,
  fullName: string,
  classYear: number
}

/* -------- State -------- */

export interface UserState {
  users: GenericPair<User>,
  user: string | null,
  isAuthenticated: boolean,
}

/* -------- Action Types -------- */

export const AUTH_USER = 'AUTH_USER';
export const DEAUTH_USER = 'DEAUTH_USER';

type AuthUserAction = Action<typeof AUTH_USER, { authenticated: boolean }>
type DeauthUserAction = Action<typeof DEAUTH_USER, Record<string, never>>

export type UserActions = AuthUserAction | DeauthUserAction;
export type UserActionTypes = typeof AUTH_USER | typeof DEAUTH_USER;
