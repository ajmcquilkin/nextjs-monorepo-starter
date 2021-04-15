import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';

import { AnnouncementActions, AnnouncementActionTypes, AnnouncementState } from 'types/announcement';
import { ModalActions, ModalActionTypes, ModalState } from 'types/modal';
import { ResourceActions, ResourceActionTypes, ResourceState } from 'types/resource';
import { UserActions, UserActionTypes, UserState } from 'types/user';

import { ServerPayload } from 'types/server';
import { Empty } from './generic';

/* -------- Generic -------- */

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export type RequestStatus = typeof REQUEST | typeof SUCCESS | typeof FAILURE;
export type RequestReturnType<D> = AxiosResponse<ServerPayload<D>>;

export type Code = number | string | null;

/* -------- Action Types -------- */

export type Actions = AnnouncementActions | ModalActions | ResourceActions | UserActions;
export type ActionTypes = AnnouncementActionTypes | ModalActionTypes | ResourceActionTypes | UserActionTypes;

export interface Action<T, D = unknown, S extends RequestStatus = RequestStatus> extends ReduxActionType {
  type: T,
  payload: D,
  status: S
}

export type AsyncAction<T extends string, D, R = Empty> =
  Action<T, R extends Empty ? R : { data: R }, 'REQUEST'> |
  Action<T, { data: D }, 'SUCCESS'> |
  Action<T, { message: string, code: Code }, 'FAILURE'>;

/* -------- State -------- */

export interface SingleRequestState {
  isLoading: boolean,
  message: string,
  code: Code
}
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
