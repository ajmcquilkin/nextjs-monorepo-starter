import { connect } from 'react-redux';
import ModalWrapper, { ModalWrapperDispatchProps, ModalWrapperPassedProps, ModalWrapperStateProps } from 'components/modals/modalWrapper/modalWrapper';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): ModalWrapperStateProps => ({
  active: state.modal.active
});

const mapDispatchToProps: ModalWrapperDispatchProps = {

};

const connector = connect<ModalWrapperStateProps, ModalWrapperDispatchProps, ModalWrapperPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(ModalWrapper);
