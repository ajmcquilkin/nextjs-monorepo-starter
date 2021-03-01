import { useRouter } from 'next/router';

import ModalContainer from 'components/modals/modalContainer';

import { createPost as createPostImport, updatePostById as updatePostByIdImport } from 'store/actionCreators/postActionCreators';
import { useModal } from 'utils/modal';

import { ConnectedThunkCreator } from 'types/state';
import { Post } from 'types/post';

export interface SubmitPostModalPassedProps {

}

export interface SubmitPostModalStateProps {
  activePost: Post,
}

export interface SubmitPostModalDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  updatePostById: ConnectedThunkCreator<typeof updatePostByIdImport>
}

export type SubmitPostModalProps = SubmitPostModalPassedProps & SubmitPostModalStateProps & SubmitPostModalDispatchProps;

const SubmitPostModal = ({ activePost, createPost, updatePostById }: SubmitPostModalProps): JSX.Element => {
  const { postId, closeModal } = useModal();
  const router = useRouter();

  const handleConfirm = (): void => {
    if (!postId) console.error('No valid postId found:', postId);
    else if (!activePost) console.error('No post found with postId', postId);
    else if (postId !== 'form') updatePostById(postId, { status: 'pending' }, { successCallback: (res) => { closeModal(); router.push(`/form/${res.data.data.post._id}`); } });
    else createPost(activePost, { successCallback: (res) => { closeModal(); router.push(`/form/${res.data.data.post._id}`); } });
  };

  return (
    <ModalContainer
      title="Confirm Submission Content"
      confirmText="Confirm"
      onConfirm={handleConfirm}
    >
      <div>aasdkfj</div>
    </ModalContainer>
  );
};

export default SubmitPostModal;
