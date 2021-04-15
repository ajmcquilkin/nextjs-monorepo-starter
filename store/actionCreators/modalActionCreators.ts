import { ModalActions, ModalState, ModalType } from 'types/modal';

export const openModal = (type: ModalType, config: Partial<ModalState>): ModalActions => ({
  type: 'OPEN_MODAL',
  payload: { type, config },
  status: 'SUCCESS'
});

export const closeModal = (): ModalActions => ({
  type: 'CLOSE_MODAL',
  payload: {},
  status: 'SUCCESS'
});
