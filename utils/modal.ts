import { Dispatch } from 'redux';
import { useStore, useDispatch } from 'react-redux';

import { closeModal } from 'store/actionCreators/modalActionCreators';

import { ModalState } from 'types/modal';
import { Actions, RootState } from 'types/state';

export const useModal = (): ModalState & { closeModal: typeof closeModal } => {
  const { modal } = useStore<RootState>().getState();
  const dispatch = useDispatch<Dispatch<Actions>>();

  return {
    type: modal.type,
    title: modal.title,
    content: modal.content,

    closeModal: () => dispatch(closeModal())
  };
};
