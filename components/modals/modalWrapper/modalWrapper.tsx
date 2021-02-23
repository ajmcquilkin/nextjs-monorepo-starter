import Modal from 'react-modal';
import { ModalType } from 'types/modal';

export interface ModalWrapperPassedProps {

}

export interface ModalWrapperStateProps {
  active: ModalType | null
}

export interface ModalWrapperDispatchProps {

}

export type ModalWrapperProps = ModalWrapperPassedProps & ModalWrapperStateProps & ModalWrapperDispatchProps;

const ModalWrapper = ({ active }: ModalWrapperProps): JSX.Element => {
  switch (active) {
    case 'ERROR_MODAL':
      return (
        <Modal isOpen>This is modal content!</Modal>
      );

    default:
      return <div />;
  }
};

export default ModalWrapper;
