import { connect } from 'react-redux';

import RejectionModal, { RejectionModalDispatchProps, RejectionModalPassedProps, RejectionModalStateProps } from 'components/modals/rejectionModal/rejectionModal';

import { closeModal } from 'store/actionCreators/modalActionCreators';
import { updatePostById } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): RejectionModalStateProps => ({
  postId: state.modal.postId
});

const mapDispatchToProps: RejectionModalDispatchProps = {
  closeModal,
  updatePostById
};

const connector = connect<RejectionModalStateProps, RejectionModalDispatchProps, RejectionModalPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(RejectionModal);
