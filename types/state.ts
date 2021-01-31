import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';
import { PostActions, PostActionTypes, PostState } from 'types/post';
import { UserActions, UserActionTypes, UserState } from 'types/user';
import { ReleaseActions, ReleaseActionTypes, ReleaseState } from './release';
import { ServerPayload } from './server';

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

export type RequestReturnType<D> = AxiosResponse<ServerPayload<D>>;

/* -------- Action Types -------- */

export type Actions = PostActions | UserActions | ReleaseActions;
export type ActionTypes = PostActionTypes | UserActionTypes | ReleaseActionTypes;

export interface ActionPayload<D = any> {
  data: D,
  message?: string,
  code?: Code
}

export interface Action<T, D = any> extends ReduxActionType {
  type: T,
  status: RequestStatusTypes,
  payload: ActionPayload<D>
}

export type GenericActionCreator = (...args: unknown[]) => void;

/* -------- State -------- */

export interface RequestState {
  [type: string]: SingleRequestState
}

export interface RootState {
  post: PostState,
  release: ReleaseState
  request: RequestState,
  user: UserState,
}
