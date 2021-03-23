import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AnnouncementActions, AnnouncementActionTypes, AnnouncementState } from 'types/announcement';
import { ModalActions, ModalActionTypes, ModalState } from 'types/modal';
import { ResourceActions, ResourceActionTypes, ResourceState } from 'types/resource';
import { UserActions, UserActionTypes, UserState } from 'types/user';

import { ServerPayload } from 'types/server';

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

export type Actions = AnnouncementActions | ModalActions | ResourceActions | UserActions;
export type ActionTypes = AnnouncementActionTypes | ModalActionTypes | ResourceActionTypes | UserActionTypes;

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
  announcement: AnnouncementState,
  modal: ModalState,
  request: RequestState,
  resource: ResourceState,
  user: UserState,
}

export type GlobalDispatch = ThunkDispatch<RootState, undefined, Actions>;
export type ThunkResult<R = void> = ThunkAction<R, RootState, undefined, Actions>;
export type ConnectedThunkCreator<T extends (...args: any) => ThunkResult> = (...args: Parameters<T>) => void;
