import ModalContainer from 'components/modals/modalContainer';
import { Post } from 'types/post';
import styles from './rejectionReasoningModal.module.scss';

export interface RejectionReasoningModalPassedProps {

}

export interface RejectionReasoningModalStateProps {
  activePost: Post
}

export interface RejectionReasoningModalDispatchProps {

}

export type RejectionReasoningModalProps = RejectionReasoningModalPassedProps & RejectionReasoningModalStateProps & RejectionReasoningModalDispatchProps;

const RejectionReasoningModal = ({ activePost }: RejectionReasoningModalProps): JSX.Element => (
  <ModalContainer
    title="Rejection Reasoning"
    cancelText="Okay"
  >
    <div className={styles.rejectionModalContainer}>
      <div className={styles.rationale}>
        <h2>Reason for Rejection:</h2>
        <p>{activePost?.rejectionReason || 'No reason given'}</p>
      </div>

      <div className={styles.commentContainer}>
        <h2>Comments</h2>
        <p>{activePost?.rejectionComment || 'No comment given'}</p>
      </div>
    </div>
  </ModalContainer>
);

export default RejectionReasoningModal;
