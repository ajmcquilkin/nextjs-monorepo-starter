import { Empty } from './generic';
import { Action } from './state';

/* -------- Generic -------- */

export interface User {
  netId: string | null,
  email: string,
  fullName: string,
  classYear: number
}

/* -------- State -------- */

export interface UserState {
  users: Record<string, User>,
  user: string | null,
  isAuthenticated: boolean,
}

/* -------- Action Types -------- */

export const AUTH_USER = 'AUTH_USER';
export const DEAUTH_USER = 'DEAUTH_USER';

export type AuthUserData = { isAuthenticated: boolean, isStaff: boolean, isReviewer: boolean, netId: User['netId'] };
export type DeauthUserData = Empty;

type AuthUserAction = Action<typeof AUTH_USER, AuthUserData>
type DeauthUserAction = Action<typeof DEAUTH_USER, DeauthUserData>

export type UserActions = AuthUserAction | DeauthUserAction;
export type UserActionTypes = typeof AUTH_USER | typeof DEAUTH_USER;
