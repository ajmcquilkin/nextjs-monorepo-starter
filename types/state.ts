import { Action as ReduxActiontType } from 'redux';
import { PostActions, PostActionTypes, PostState } from 'types/post';
import { UserActions, UserActionTypes, UserState } from 'types/user';

/* -------- Generic -------- */

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export type RequestStatus = 'REQUEST' | 'SUCCESS' | 'FAILURE' | 'CLEAR_ERROR';
export type RequestStatusTypes = typeof REQUEST | typeof SUCCESS | typeof FAILURE | typeof CLEAR_ERROR;

export type Code = number | string | null;

export interface SingleRequestState {
  isLoading: boolean,
  message: string,
  code: Code
}

/* -------- Action Types -------- */

export type Actions = PostActions | UserActions;
export type ActionTypes = PostActionTypes | UserActionTypes;

export interface ActionPayload<D = any> {
  data: D,
  message?: string,
  code?: Code
}

export interface Action<T, D = any> extends ReduxActiontType {
  type: T,
  status: RequestStatusTypes,
  payload: ActionPayload<D>
}

/* -------- State -------- */

export interface RequestState {
  [type: string]: SingleRequestState
}

export interface RootState {
  post: PostState,
  request: RequestState,
  user: UserState
}
