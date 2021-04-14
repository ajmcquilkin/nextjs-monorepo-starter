import { ReactNode } from 'react';
import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

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
  closeModal: typeof closeModalImport
}

export type ModalContainerProps = ModalContainerPassedProps & ModalContainerStateProps & ModalContainerDispatchProps;

const ModalContainer = ({
  title, confirmText, rejectText, cancelText, children,
  onConfirm, onReject, closeModal
}: ModalContainerProps): JSX.Element => (
  <div>
    {title && (
      <div><h1>{title}</h1></div>
    )}

    <div>{children}</div>

    <div>
      {confirmText && onConfirm && (
        <button
          type="button"
          onClick={() => onConfirm()}
        >
          <p>{confirmText}</p>
        </button>
      )}

      {rejectText && onReject && (
        <button
          type="button"
          onClick={() => onReject()}
        >
          <p>{rejectText}</p>
        </button>
      )}

      <button
        type="button"
        onClick={() => closeModal()}
      >
        <p>{cancelText || 'Cancel'}</p>
      </button>

    </div>
  </div>
);

export default ModalContainer;
