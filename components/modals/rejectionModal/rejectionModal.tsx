import { useState } from 'react';

import ModalContainer from 'components/modals/modalContainer';
import { updatePostById as updatePostByIdImport } from 'store/actionCreators/postActionCreators';

import { useModal } from 'utils/modal';
import { PostRejectionReason } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './rejectionModal.module.scss';

export interface RejectionModalPassedProps {

}

export interface RejectionModalStateProps {

}

export interface RejectionModalDispatchProps {
  updatePostById: ConnectedThunkCreator<typeof updatePostByIdImport>
}

export type RejectionModalProps = RejectionModalPassedProps & RejectionModalStateProps & RejectionModalDispatchProps;

const RejectionModal = ({ updatePostById }: RejectionModalProps): JSX.Element => {
  const [rejectionComment, setRejectionComment] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState<PostRejectionReason>('guidelines');

  const { postId, closeModal } = useModal();

  const handleConfirm = () => {
    if (!postId) console.error('No valid postId found:', postId);
    else updatePostById(postId, { status: 'rejected', rejectionComment, rejectionReason }, { successCallback: closeModal });
  };

  return (
    <ModalContainer
      title="Rejection Reasoning"
      confirmText="Reject"
      onConfirm={handleConfirm}
    >
      <div className={styles.rejectionModalContainer}>
        <div className={styles.rationaleSelector}>
          <p>Reason for Rejection</p>
          <select value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value as PostRejectionReason)}>
            <option value="guidelines">Guidelines</option>
            <option value="errors">Errors</option>
            <option value="event">Event</option>
            <option value="subject">Subject</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.commentContainer}>
          <p>Comments</p>
          <textarea value={rejectionComment} onChange={(e) => setRejectionComment(e.target.value)} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default RejectionModal;
