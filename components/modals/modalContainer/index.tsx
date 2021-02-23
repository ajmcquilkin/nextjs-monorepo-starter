import { connect } from 'react-redux';
import ModalContainer, { ModalContainerStateProps, ModalContainerDispatchProps, ModalContainerPassedProps } from 'components/modals/modalContainer/modalContainer';
import { closeModal } from 'store/actionCreators/modalActionCreators';

const mapStateToProps = () => ({});
const mapDispatchToProps: ModalContainerDispatchProps = { closeModal };

const connector = connect<ModalContainerStateProps, ModalContainerDispatchProps, ModalContainerPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(ModalContainer);
