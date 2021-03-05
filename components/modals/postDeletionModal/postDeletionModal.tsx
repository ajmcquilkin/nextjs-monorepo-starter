import { useRouter } from 'next/router';
import ModalContainer from 'components/modals/modalContainer';

import { deletePostById as deletePostByIdImport } from 'store/actionCreators/postActionCreators';
import { useModal } from 'utils/modal';

import { ConnectedThunkCreator } from 'types/state';

import styles from './postDeletionModal.module.scss';

export interface PostDeletionModalPassedProps {

}

export interface PostDeletionModalStateProps {

}

export interface PostDeletionModalDispatchProps {
  deletePostById: ConnectedThunkCreator<typeof deletePostByIdImport>
}

export type PostDeletionModalProps = PostDeletionModalPassedProps & PostDeletionModalStateProps & PostDeletionModalDispatchProps;

const PostDeletionModal = ({ deletePostById }: PostDeletionModalProps): JSX.Element => {
  const { postId, closeModal } = useModal();
  const router = useRouter();

  const handleConfirm = () => {
    if (postId && postId !== 'form') deletePostById(postId, { successCallback: () => { closeModal(); router.push('/submissions'); } });
    else { closeModal(); router.push('/submissions'); }
  };

  return (
    <ModalContainer
      title="Confirm Deletion"
      confirmText="Delete"
      onConfirm={handleConfirm}
    >
      <div className={styles.postDeletionModalContainer}>
        <p>Are you sure you want to delete this post?</p>
      </div>
    </ModalContainer>
  );
};

export default PostDeletionModal;
