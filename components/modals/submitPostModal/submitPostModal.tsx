import { useRouter } from 'next/router';

import ModalContainer from 'components/modals/modalContainer';
import HomeSubmission from 'components/submissions/homeSubmission';

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
  const {
    postId, action, redirect,
    closeModal
  } = useModal();

  const router = useRouter();

  const handleConfirm = (): void => {
    if (!postId) console.error('No valid postId found:', postId);
    else if (!activePost) console.error('No post found with postId', postId);
    else if (action === 'CREATE') {
      const { _id, ...post } = activePost;

      createPost(post, {
        successCallback: (_res) => { closeModal(); router.push(redirect || '/submissions'); },
        failureCallback: closeModal
      });
    } else {
      updatePostById(postId, activePost, {
        successCallback: (_res) => { closeModal(); router.push(redirect || '/submissions'); },
        failureCallback: closeModal
      });
    }
  };

  return (
    <ModalContainer
      title="Confirm Submission Content"
      confirmText="Confirm"
      onConfirm={handleConfirm}
    >
      <HomeSubmission content={activePost} />
    </ModalContainer>
  );
};

export default SubmitPostModal;
