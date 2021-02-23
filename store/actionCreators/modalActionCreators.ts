import { ModalConfig, ModalType } from 'types/modal';
import { ThunkResult } from 'types/state';

export const openModal = (type: ModalType, config: Partial<ModalConfig>): ThunkResult => (dispatch): void => {
  dispatch({
    type: 'OPEN_MODAL',
    payload: { data: { type, config } },
    status: 'SUCCESS'
  });
};

export const closeModal = (): ThunkResult => (dispatch): void => {
  dispatch({
    type: 'CLOSE_MODAL',
    payload: { data: {} },
    status: 'SUCCESS'
  });
};
