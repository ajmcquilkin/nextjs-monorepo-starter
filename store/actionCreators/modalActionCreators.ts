import { ModalActions, ModalState, ModalType } from 'types/modal';

export const openModal = (type: ModalType, config: Partial<ModalState>): ModalActions => ({
  type: 'OPEN_MODAL',
  payload: { type, config }
});

export const closeModal = (): ModalActions => ({
  type: 'CLOSE_MODAL',
  payload: {}
});
