import { connect } from 'react-redux';

import ModalWrapper, { ModalWrapperDispatchProps, ModalWrapperPassedProps, ModalWrapperStateProps } from 'components/modals/modalWrapper/modalWrapper';
import { closeModal } from 'store/actionCreators/modalActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): ModalWrapperStateProps => ({
  type: state.modal.type,

  title: state.modal.title,
  content: state.modal.content
});

const mapDispatchToProps: ModalWrapperDispatchProps = {
  closeModal
};

const connector = connect<ModalWrapperStateProps, ModalWrapperDispatchProps, ModalWrapperPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(ModalWrapper);
