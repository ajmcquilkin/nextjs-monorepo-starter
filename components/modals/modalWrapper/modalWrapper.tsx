import ModalComponent from 'react-modal';

import ErrorModal from 'components/modals/errorModal';

import { Modal } from 'types/modal';
import { ConnectedThunkCreator } from 'types/state';
import { closeModal as closeModalImport } from 'store/actionCreators/modalActionCreators';

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

const ModalWrapper = ({
  type, title, content, closeModal
}: ModalWrapperProps): JSX.Element => (
  <ModalComponent
    isOpen={!!type}
    contentLabel={title}
  >
    <h1>{title}</h1>
    <button type="button" onClick={() => closeModal()}><img src="/close.svg" alt="close modal" /></button>

    <ModalWrapperContent content={content} type={type} />

    <div>
      <button type="button" onClick={() => closeModal()}>Exit</button>
    </div>
  </ModalComponent>
);

export default ModalWrapper;
