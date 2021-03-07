import ModalContainer from 'components/modals/modalContainer';
import { useModal } from 'utils/modal';
import styles from './errorModal.module.scss';

export interface ErrorModalProps {

}

const ErrorModal = (): JSX.Element => {
  const { title, content } = useModal();

  return (
    <ModalContainer title={title} cancelText="Okay">
      <div className={styles.errorModalContainer}>
        <p className={styles.errorContent}>{content}</p>
      </div>
    </ModalContainer>
  );
};

export default ErrorModal;
