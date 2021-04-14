import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';

import {
  AnnouncementActions, AnnouncementActionTypes, AnnouncementState
} from 'types/announcement';

import {
  ModalActions, ModalActionTypes, ModalState
} from 'types/modal';

import {
  ResourceActions, ResourceActionTypes, ResourceActionSubTypes,
  ResourceState
} from 'types/resource';

import {
  UserActions, UserActionTypes, UserActionSubTypes,
  UserState
} from 'types/user';

import { ServerPayload } from 'types/server';
import { Empty } from './generic';

/* -------- Generic -------- */

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export type RequestStatus = 'REQUEST' | 'SUCCESS' | 'FAILURE';
export type RequestStatusTypes = typeof REQUEST | typeof SUCCESS | typeof FAILURE;
export type RequestReturnType<D> = AxiosResponse<ServerPayload<D>>;

export type Code = number | string | null;

/* -------- Action Types -------- */

export type Actions = AnnouncementActions | ModalActions | ResourceActions | UserActions;
export type ActionTypes = AnnouncementActionTypes | ModalActionTypes | ResourceActionTypes | UserActionTypes;
export type ActionSubTypes = AnnouncementActionTypes | ModalActionTypes | ResourceActionSubTypes | UserActionSubTypes;

export interface Action<T, D = unknown> extends ReduxActionType {
  type: T,
  payload: D
}

export type AsyncActionType<T extends string> = `${T}_${RequestStatus}`;
export type AsyncAction<T extends string, S, R = Empty> = Action<`${T}_REQUEST`, R extends Empty ? R : { data: R }> |
  Action<`${T}_SUCCESS`, { data: S }> |
  Action<`${T}_FAILURE`, { message: string, code: Code }>;

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
