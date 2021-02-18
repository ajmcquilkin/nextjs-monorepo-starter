import { connect } from 'react-redux';

import Compile, { CompileStateProps, CompileDispatchProps, CompilePassedProps } from 'components/pages/compile';

import { ActionTypes, RootState } from 'types/state';
import { createRelease, fetchReleaseByDate, updateReleaseById } from 'store/actionCreators/releaseActionCreators';
import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';

const watchActions: ActionTypes[] = [];
const loadingSelector = createLoadingSelector(watchActions);

const mapStateToProps = (state: RootState): CompileStateProps => ({
  release: state.release.release,
  postMap: state.post.posts,
  isLoading: loadingSelector(state)
});

const mapDispatchToProps: CompileDispatchProps = {
  fetchReleaseByDate,
  createRelease,
  updateReleaseById
};

const connector = connect<CompileStateProps, CompileDispatchProps, CompilePassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Compile);
