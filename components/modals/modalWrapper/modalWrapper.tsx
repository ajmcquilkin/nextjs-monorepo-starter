import ReactModal from 'react-modal';

import ErrorModal from 'components/modals/errorModal';
import RejectionModal from 'components/modals/rejectionModal';

import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

import { Modal } from 'types/modal';
import { ConnectedThunkCreator } from 'types/state';

import styles from './modalWrapper.module.scss';

export interface ModalWrapperPassedProps {

}

export type ModalWrapperStateProps = Modal & {

};

export interface ModalWrapperDispatchProps {
  closeModal: ConnectedThunkCreator<typeof closeModalImport>
}

export type ModalWrapperProps = ModalWrapperPassedProps & ModalWrapperStateProps & ModalWrapperDispatchProps;

interface ModalWrapperContentProps {
  type: Modal['type'],
  title: Modal['title'],
  content: Modal['content']
}

const ModalWrapperContent = ({ type, title, content }: ModalWrapperContentProps): JSX.Element => {
  switch (type) {
    case 'ERROR_MODAL':
      return <ErrorModal content={content} />;

    case 'REJECTION_MODAL':
      return <RejectionModal title={title} />;

    default:
      return <div />;
  }
};

const modalWrapperStyles: React.CSSProperties = {
  margin: '48px',
  boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.08)',
  backgroundColor: '',
  borderRadius: '10px',
  border: 'none'
};

const ModalWrapper = ({
  type, title, content, bgColor, closeModal
}: ModalWrapperProps): JSX.Element => (
  <ReactModal
    isOpen={!!type}
    contentLabel={title}
    shouldCloseOnOverlayClick
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

    <ModalWrapperContent
      type={type}
      title={title}
      content={content}
    />
  </ReactModal>
);

export default ModalWrapper;
