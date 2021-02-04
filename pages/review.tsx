import { connect } from 'react-redux';

import Review, { ReviewStateProps, ReviewDispatchProps, ReviewPassedProps } from 'components/pages/review';
import { fetchWithStatus } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): ReviewStateProps => ({
  currentPosts: state.post.results.map((id) => state.post.posts[id])
});

const mapDispatchToProps: ReviewDispatchProps = {
  fetchWithStatus
};

const connector = connect<ReviewStateProps, ReviewDispatchProps, ReviewPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Review);
