import { Empty } from './generic';
import { Action } from './state';

/* -------- Generic -------- */

export type ModalType = 'ERROR_MODAL';

export interface Modal {
  type: ModalType,
}

/* -------- State -------- */

export interface ModalState {
  active: ModalType | null
}

/* -------- Action Types -------- */

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export type OpenModalData = { type: ModalType };
export type CloseModalData = Empty;

type OpenModalAction = Action<typeof OPEN_MODAL, OpenModalData>;
type CloseModalAction = Action<typeof CLOSE_MODAL, CloseModalData>;

export type ModalActions = OpenModalAction | CloseModalAction;
export type ModalActionTypes = typeof OPEN_MODAL | typeof CLOSE_MODAL;
