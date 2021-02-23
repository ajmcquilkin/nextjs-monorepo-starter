import ReactModal from 'react-modal';

import ErrorModal from 'components/modals/errorModal';
import RejectionModal from 'components/modals/rejectionModal';

import { useModal } from 'utils/modal';

import styles from './modalWrapper.module.scss';

export interface ModalWrapperProps {

}

const modalWrapperStyles: React.CSSProperties = {
  margin: '48px',
  boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.08)',
  backgroundColor: '',
  borderRadius: '10px',
  border: 'none'
};

const ModalWrapper = (): JSX.Element => {
  const {
    type, title, bgColor, closeModal
  } = useModal();

  const getModalContent = (): JSX.Element => {
    switch (type) {
      case 'ERROR_MODAL':
        return <ErrorModal />;

      case 'REJECTION_MODAL':
        return <RejectionModal />;

      default:
        return <div />;
    }
  };

  return (
    <ReactModal
      isOpen={!!type}
      contentLabel={title}
      shouldCloseOnOverlayClick
      onRequestClose={() => closeModal()}
      className={styles.modalWrapperContainer}
      style={{
        content: {
          ...modalWrapperStyles,
          backgroundColor: bgColor
        }
      }}
    >
      <button className={styles.closeButton} type="button" onClick={() => closeModal()}>
        <img src="/close.svg" alt="close modal" />
      </button>

      {getModalContent()}
    </ReactModal>
  );
};

export default ModalWrapper;
