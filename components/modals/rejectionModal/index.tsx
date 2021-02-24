import { connect } from 'react-redux';

import RejectionModal, { RejectionModalDispatchProps, RejectionModalPassedProps, RejectionModalStateProps } from 'components/modals/rejectionModal/rejectionModal';
import { updatePostById } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (_state: RootState): RejectionModalStateProps => ({

});

const mapDispatchToProps: RejectionModalDispatchProps = {
  updatePostById
};

const connector = connect<RejectionModalStateProps, RejectionModalDispatchProps, RejectionModalPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(RejectionModal);
