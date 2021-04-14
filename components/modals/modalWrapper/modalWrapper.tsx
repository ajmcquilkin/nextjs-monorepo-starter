import ReactModal from 'react-modal';

import ModalContainer from 'components/modals/modalContainer';
import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

import { ModalState } from 'types/modal';

export interface ModalWrapperPassedProps {

}

export type ModalWrapperStateProps = ModalState & {

}

export interface ModalWrapperDispatchProps {
  closeModal: typeof closeModalImport
}

export type ModalWrapperProps = ModalWrapperPassedProps & ModalWrapperStateProps & ModalWrapperDispatchProps;

const modalWrapperStyles: React.CSSProperties = {
  margin: '48px auto',
  maxWidth: '900px',

  boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.08)',
  backgroundColor: '',
  borderRadius: '10px',
  border: 'none'
};

const ModalWrapper = ({
  type, title, closeModal
}: ModalWrapperProps): JSX.Element => {
  const getModalContent = (): JSX.Element => {
    switch (type) {
      case 'SAMPLE_MODAL':
        return (
          <ModalContainer title="Sample Modal!">
            This is a sample modal!
          </ModalContainer>
        );

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
      style={{
        content: {
          ...modalWrapperStyles,
        }
      }}
    >
      <button type="button" onClick={() => closeModal()}>
        <img src="/icons/close.svg" alt="close modal" />
      </button>

      {getModalContent()}
    </ReactModal>
  );
};

export default ModalWrapper;
