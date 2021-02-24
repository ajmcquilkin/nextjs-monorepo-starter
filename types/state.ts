import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ModalActions, ModalActionTypes, ModalState } from 'types/modal';
import { PostActions, PostActionTypes, PostState } from 'types/post';
import { ReleaseActions, ReleaseActionTypes, ReleaseState } from 'types/release';
import { UserActions, UserActionTypes, UserState } from 'types/user';
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

export type Actions = ModalActions | PostActions | ReleaseActions | UserActions;
export type ActionTypes = ModalActionTypes | PostActionTypes | ReleaseActionTypes | UserActionTypes;

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

/* -------- State -------- */

export interface RequestState {
  [type: string]: SingleRequestState
}

export interface RootState {
  modal: ModalState,
  post: PostState,
  release: ReleaseState
  request: RequestState,
  user: UserState,
}

export type GlobalDispatch = ThunkDispatch<RootState, undefined, Actions>;
export type ThunkResult<R = void> = ThunkAction<R, RootState, undefined, Actions>;
export type ConnectedThunkCreator<T extends (...args: any) => ThunkResult> = (...args: Parameters<T>) => void;
