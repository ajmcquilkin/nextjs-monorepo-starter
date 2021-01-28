import { connect } from 'react-redux';

import Compile, { CompileStateProps, CompileDispatchProps, CompilePassedProps } from 'components/pages/compile';

import { ActionTypes, RootState } from 'types/state';
import { createRelease, fetchReleaseByDate, updateReleaseById } from 'store/actionCreators/releaseActionCreators';
import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';

import { Release } from 'types/release';

const watchActions: ActionTypes[] = [];
const loadingSelector = createLoadingSelector(watchActions);

const mapStateToProps = (state: RootState): CompileStateProps => ({
  release: state.release.release,
  posts: state.release.release ? Object.values(state.post.posts).filter(({ _id }) => {
    const { release } = state.release;
    return (release as Release).news.includes(_id)
      || (release as Release).announcements.includes(_id)
      || (release as Release).events.includes(_id);
  }) : [],
  isLoading: loadingSelector(state)
});

const mapDispatchToProps: CompileDispatchProps = {
  fetchReleaseByDate,
  createRelease,
  updateReleaseById
};

const connector = connect<CompileStateProps, CompileDispatchProps, CompilePassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Compile);
