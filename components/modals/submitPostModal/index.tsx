import { connect } from 'react-redux';

import SubmitPostModal, { SubmitPostModalPassedProps, SubmitPostModalStateProps, SubmitPostModalDispatchProps } from 'components/modals/submitPostModal/submitPostModal';
import { createPost, updatePostById } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): SubmitPostModalStateProps => ({
  activePost: state.post.posts?.[state.modal?.postId || ''] || null
});

const mapDispatchToProps: SubmitPostModalDispatchProps = {
  createPost,
  updatePostById
};

const connector = connect<SubmitPostModalStateProps, SubmitPostModalDispatchProps, SubmitPostModalPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(SubmitPostModal);
