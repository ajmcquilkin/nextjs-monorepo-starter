import { connect } from 'react-redux';

import Review, { ReviewStateProps, ReviewDispatchProps, ReviewPassedProps } from 'components/pages/review';

import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchWithStatus } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const postLoadingSelector = createLoadingSelector(['FETCH_POST_RESULTS', 'FETCH_POST', 'DELETE_POST']);

const mapStateToProps = (state: RootState): ReviewStateProps => ({
  currentPosts: Object.values(state.post.posts).filter((post) => post.status === 'pending'),
  isLoading: postLoadingSelector(state)
});

const mapDispatchToProps: ReviewDispatchProps = {
  fetchWithStatus
};

const connector = connect<ReviewStateProps, ReviewDispatchProps, ReviewPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Review);
