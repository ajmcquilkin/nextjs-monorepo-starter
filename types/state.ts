import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';

// import {
//   AnnouncementActions, AnnouncementActionTypes, AnnouncementState
// } from 'types/announcement';

// import {
//   ModalActions, ModalActionTypes, ModalState
// } from 'types/modal';

import {
  ResourceActions, ResourceActionTypes, ResourceActionSubTypes,
  ResourceState
} from 'types/resource';

// import {
//   UserActions, UserActionTypes, UserState
// } from 'types/user';

import { ServerPayload } from 'types/server';
import { Empty } from './generic';

/* -------- Generic -------- */

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export type RequestStatus = 'REQUEST' | 'SUCCESS' | 'FAILURE';
export type RequestStatusTypes = typeof REQUEST | typeof SUCCESS | typeof FAILURE;

export type Code = number | string | null;

export interface SingleRequestState {
  isLoading: boolean,
  message: string,
  code: Code
}

export type RequestReturnType<D> = AxiosResponse<ServerPayload<D>>;

/* -------- Action Types -------- */

export type Actions = ResourceActions;
export type ActionTypes = ResourceActionTypes;
export type ActionSubTypes = ResourceActionSubTypes;

export interface ActionHelper<T, D = unknown> extends ReduxActionType {
  type: T,
  payload: D
}

export type ActionType<T extends string> = `${T}_${RequestStatus}`;
export type Action<T extends string, S, R = Empty> = ActionHelper<`${T}_REQUEST`, R extends Empty ? R : { data: R }> |
  ActionHelper<`${T}_SUCCESS`, { data: S }> |
  ActionHelper<`${T}_FAILURE`, { message: string, code: Code }>;

/* -------- State -------- */

export interface RequestState {
  [type: string]: SingleRequestState
}

export interface RootState {
  // announcement: AnnouncementState,
  // modal: ModalState,
  request: RequestState,
  resource: ResourceState,
  // user: UserState,
}
