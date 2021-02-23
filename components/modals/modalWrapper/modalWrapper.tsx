import ReactModal from 'react-modal';

import ErrorModal from 'components/modals/errorModal';
import RejectionModal from 'components/modals/rejectionModal';

import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

import { ModalState } from 'types/modal';
import { ConnectedThunkCreator } from 'types/state';

import styles from './modalWrapper.module.scss';

export interface ModalWrapperPassedProps {

}

export type ModalWrapperStateProps = ModalState & {

}

export interface ModalWrapperDispatchProps {
  closeModal: ConnectedThunkCreator<typeof closeModalImport>
}

export type ModalWrapperProps = ModalWrapperPassedProps & ModalWrapperStateProps & ModalWrapperDispatchProps;

const modalWrapperStyles: React.CSSProperties = {
  margin: '48px',
  boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.08)',
  backgroundColor: '',
  borderRadius: '10px',
  border: 'none'
};

const ModalWrapper = ({
  type, title, bgColor, closeModal
}: ModalWrapperProps): JSX.Element => {
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
