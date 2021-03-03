import { useStore, useDispatch } from 'react-redux';

import { closeModal } from 'store/actionCreators/modalActionCreators';

import { ModalState } from 'types/modal';
import { ConnectedThunkCreator, GlobalDispatch, RootState } from 'types/state';

export const useModal = (): ModalState & { closeModal: ConnectedThunkCreator<typeof closeModal> } => {
  const { modal } = useStore<RootState>().getState();
  const dispatch = useDispatch<GlobalDispatch>();

  return {
    type: modal.type,

    title: modal.title,
    content: modal.content,

    bgColor: modal.bgColor,
    action: modal.action,
    postId: modal.postId,

    closeModal: () => dispatch(closeModal())
  };
};
