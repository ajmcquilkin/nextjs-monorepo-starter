import { ModalType } from 'types/modal';
import { ThunkResult } from 'types/state';

export const openModal = (type: ModalType, config: { title?: string, content: string, bgColor?: string }): ThunkResult => (dispatch): void => {
  dispatch({
    type: 'OPEN_MODAL',
    payload: { data: { type, config: { title: config.title, content: config.content, bgColor: config.bgColor } } },
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
