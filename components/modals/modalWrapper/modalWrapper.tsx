import ModalComponent from 'react-modal';

import ErrorModal from 'components/modals/errorModal';
import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

import { Modal } from 'types/modal';
import { ConnectedThunkCreator } from 'types/state';

import styles from './modalWrapper.module.scss';

export interface ModalWrapperPassedProps {

}

export interface ModalWrapperStateProps {
  type: Modal['type'] | null,
  title: Modal['title'],
  content: Modal['content']
}

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
      return (
        <ErrorModal content={content} />
      );

    default:
      return <div />;
  }
};

const modalWrapperStyles: ModalComponent.Styles = {
  content: {
    margin: '48px',
    boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.08)',
    backgroundColor: '#E7E7E7',
    borderRadius: '10px',
    border: 'none'
  }
};

const ModalWrapper = ({
  type, title, content, closeModal
}: ModalWrapperProps): JSX.Element => (
  <ModalComponent
    isOpen={!!type}
    contentLabel={title}
    style={modalWrapperStyles}
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
      <button type="button" onClick={() => closeModal()}>Exit</button>
    </div>
  </ModalComponent>
);

export default ModalWrapper;
