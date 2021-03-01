import { connect } from 'react-redux';

import PostDeletionModal, { PostDeletionModalPassedProps, PostDeletionModalStateProps, PostDeletionModalDispatchProps } from 'components/modals/postDeletionModal/postDeletionModal';
import { deletePostById } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (_state: RootState): PostDeletionModalStateProps => ({

});

const mapDispatchToProps: PostDeletionModalDispatchProps = {
  deletePostById
};

const connector = connect<PostDeletionModalStateProps, PostDeletionModalDispatchProps, PostDeletionModalPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(PostDeletionModal);
