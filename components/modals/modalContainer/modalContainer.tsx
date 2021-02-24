import { ReactNode } from 'react';

import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';
import { ConnectedThunkCreator } from 'types/state';

import styles from './modalContainer.module.scss';

export interface ModalContainerPassedProps {
  title?: string,
  confirmText?: string,
  rejectText?: string,
  cancelText?: string,
  onConfirm?: () => void,
  onReject?: () => void,
  children: ReactNode
}

export interface ModalContainerStateProps {

}

export interface ModalContainerDispatchProps {
  closeModal: ConnectedThunkCreator<typeof closeModalImport>
}

export type ModalContainerProps = ModalContainerPassedProps & ModalContainerStateProps & ModalContainerDispatchProps;

const ModalContainer = ({
  title, confirmText, rejectText, cancelText, children,
  onConfirm, onReject, closeModal
}: ModalContainerProps): JSX.Element => (
  <div className={styles.modalContainer}>
    {title && (
      <div className={styles.titleContainer}>
        <h1>{title}</h1>
      </div>
    )}

    <div className={styles.contentContainer}>
      {children}
    </div>

    <div className={styles.buttonContainer}>
      {confirmText && onConfirm && <button className={styles.confirm} type="button" onClick={() => onConfirm()}>{confirmText}</button>}
      {rejectText && onReject && <button className={styles.reject} type="button" onClick={() => onReject()}>{rejectText}</button>}
      <button className={styles.cancel} type="button" onClick={() => closeModal()}>{cancelText || 'Cancel'}</button>
    </div>
  </div>
);

export default ModalContainer;
