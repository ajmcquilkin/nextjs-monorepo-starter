import ModalComponent from 'react-modal';

import ErrorModal from 'components/modals/errorModal';
import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

import { Modal } from 'types/modal';
import { ConnectedThunkCreator } from 'types/state';

import styles from './modalWrapper.module.scss';
import RejectionModal from '../rejectionModal';

export interface ModalWrapperPassedProps {

}

export type ModalWrapperStateProps = Modal & {

};

export interface ModalWrapperDispatchProps {
  closeModal: ConnectedThunkCreator<typeof closeModalImport>
}

export type ModalWrapperProps = ModalWrapperPassedProps & ModalWrapperStateProps & ModalWrapperDispatchProps;

interface ModalWrapperContentProps {
  type: Modal['type'] | null,
  content: Modal['content']
}

const ModalWrapperContent = ({ type, content }: ModalWrapperContentProps): JSX.Element => {
  switch (type) {
    case 'ERROR_MODAL':
      return <ErrorModal content={content} />;

    case 'REJECTION_MODAL':
      return <RejectionModal />;

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
  type, title, content,
  confirm, reject, cancel, bgColor,
  closeModal
}: ModalWrapperProps): JSX.Element => (
  <ModalComponent
    isOpen={!!type}
    contentLabel={title}
    style={{
      content: {
        ...modalWrapperStyles,
        backgroundColor: bgColor
      }
    }}
    className={styles.modalWrapperContainer}
  >
    <button className={styles.closeButton} type="button" onClick={() => closeModal()}><img src="/close.svg" alt="close modal" /></button>

    {title && (
      <div className={styles.titleContainer}>
        <h1>{title}</h1>
      </div>
    )}

    <div className={styles.contentContainer}>
      <ModalWrapperContent content={content} type={type} />
    </div>

    <div className={styles.buttonContainer}>
      {confirm && <button className={styles.confirm} type="button" onClick={() => closeModal()}>{confirm}</button>}
      {reject && <button className={styles.reject} type="button" onClick={() => closeModal()}>{reject}</button>}
      {cancel && <button className={styles.cancel} type="button" onClick={() => closeModal()}>{cancel}</button>}
    </div>
  </ModalComponent>
);

export default ModalWrapper;
