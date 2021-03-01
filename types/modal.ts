import { Empty } from './generic';
import { Action } from './state';

/* -------- Generic -------- */

export type ModalType = 'ERROR_MODAL' | 'REJECTION_MODAL' | 'SUBMIT_POST_MODAL' | 'DISCARD_POST_MODAL';

export interface ModalConfig {
  title: string,
  content: string,

  confirm: string,
  reject: string,
  cancel: string,

  bgColor: string
}

export type Modal = ModalConfig & {
  type: ModalType | null,
}

/* -------- State -------- */

export type ModalState = {
  type: Modal['type'],

  title: Modal['title'],
  content: Modal['content'],

  bgColor: Modal['bgColor'],
  postId: string | null
}

/* -------- Action Types -------- */

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export type OpenModalData = { type: ModalType, config: Partial<ModalState> };
export type CloseModalData = Empty;

type OpenModalAction = Action<typeof OPEN_MODAL, OpenModalData>;
type CloseModalAction = Action<typeof CLOSE_MODAL, CloseModalData>;

export type ModalActions = OpenModalAction | CloseModalAction;
export type ModalActionTypes = typeof OPEN_MODAL | typeof CLOSE_MODAL;
