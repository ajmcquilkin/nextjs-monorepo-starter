import { connect } from 'react-redux';

import Compile, { CompileStateProps, CompileDispatchProps, CompilePassedProps } from 'components/pages/compile';

import { RootState } from 'types/state';
import { createRelease, fetchReleaseByDate, updateReleaseById } from 'store/actionCreators/releaseActionCreators';
import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';

const loadingSelector = createLoadingSelector(['FETCH_RELEASE']);

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
