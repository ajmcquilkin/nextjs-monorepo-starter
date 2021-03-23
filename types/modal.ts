import { Empty } from 'types/generic';
import { Action } from 'types/state';

/* -------- Generic -------- */

export type ModalType = 'SAMPLE_MODAL';

export interface ModalConfig {
  title: string,
  content: string,

  confirm: string,
  reject: string,
  cancel: string
}

export type Modal = ModalConfig & {
  type: ModalType | null,
}

/* -------- State -------- */

export type ModalState = {
  type: Modal['type'],
  title: Modal['title'],
  content: Modal['content']
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
