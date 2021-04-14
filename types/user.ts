import { Empty } from 'types/generic';
import { Action, AsyncActionType, AsyncAction } from 'types/state';

/* -------- Generic -------- */

export interface User {
  netId: string | null,
  name: string
}

/* -------- State -------- */

export type UserState = User & {
  hasAttemptedAuth: boolean,
  isAuthenticated: boolean,
  isStaff: boolean,
  isReviewer: boolean
}

/* -------- Action Types -------- */

export const AUTH_USER = 'AUTH_USER';
export const DEAUTH_USER = 'DEAUTH_USER';

export type AuthUserData = {
  isAuthenticated: boolean,
  isReviewer: boolean,
  isStaff: boolean,
  netId: User['netId'],
  name: User['name'],
};

export type DeauthUserData = Empty;

type AuthUserActions = AsyncAction<typeof AUTH_USER, AuthUserData>
type DeauthUserAction = Action<typeof DEAUTH_USER, DeauthUserData>

export type UserActions = AuthUserActions | DeauthUserAction;
export type UserActionTypes = AsyncActionType<typeof AUTH_USER> | typeof DEAUTH_USER;
export type UserActionSubTypes = typeof AUTH_USER | typeof DEAUTH_USER;
