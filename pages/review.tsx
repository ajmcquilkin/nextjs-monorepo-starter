import { connect } from 'react-redux';

import Review, { ReviewStateProps, ReviewDispatchProps, ReviewPassedProps } from 'components/pages/review';
import { fetchAllPosts } from 'store/actionCreators/postActionCreators';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): ReviewStateProps => ({
  currentPosts: Object.values(state.post.posts)
});

const mapDispatchToProps: ReviewDispatchProps = {
  fetchAllPosts
};

const connector = connect<ReviewStateProps, ReviewDispatchProps, ReviewPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Review);
