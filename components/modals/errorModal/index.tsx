import ModalContainer from 'components/modals/modalContainer';
import styles from './errorModal.module.scss';

export interface ErrorModalProps {
  content: string
}

const ErrorModal = ({ content }: ErrorModalProps): JSX.Element => (
  <ModalContainer cancelText="Close">
    <div className={styles.errorModalContainer}>
      <p className={styles.errorContent}>{content}</p>
    </div>
  </ModalContainer>
);

export default ErrorModal;
