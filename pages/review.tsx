import { connect } from 'react-redux';

import Review, { ReviewStateProps, ReviewDispatchProps, ReviewPassedProps } from 'components/pages/review';

import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchWithStatus } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const postLoadingSelector = createLoadingSelector(['FETCH_POST_RESULTS']);

const mapStateToProps = (state: RootState): ReviewStateProps => ({
  currentPosts: state.post.results.map((id) => state.post.posts[id]),
  isLoading: postLoadingSelector(state)
});

const mapDispatchToProps: ReviewDispatchProps = {
  fetchWithStatus
};

const connector = connect<ReviewStateProps, ReviewDispatchProps, ReviewPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Review);
