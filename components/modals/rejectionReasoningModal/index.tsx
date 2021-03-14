import { connect } from 'react-redux';

import RejectionReasoningModal, {
  RejectionReasoningModalDispatchProps,
  RejectionReasoningModalPassedProps,
  RejectionReasoningModalStateProps
} from 'components/modals/rejectionReasoningModal/rejectionReasoningModal';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): RejectionReasoningModalStateProps => ({
  activePost: state.post.posts?.[state.modal?.postId || ''] || null
});

const mapDispatchToProps: RejectionReasoningModalDispatchProps = {

};

const connector = connect<
  RejectionReasoningModalStateProps,
  RejectionReasoningModalDispatchProps,
  RejectionReasoningModalPassedProps
>(mapStateToProps, mapDispatchToProps);

export default connector(RejectionReasoningModal);
