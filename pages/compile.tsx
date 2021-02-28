import { connect } from 'react-redux';

import Compile, { CompileStateProps, CompileDispatchProps, CompilePassedProps } from 'components/pages/compile';

import { openModal } from 'store/actionCreators/modalActionCreators';
import { fetchPostsByDate } from 'store/actionCreators/postActionCreators';
import { createRelease, fetchReleaseByDate, updateReleaseById } from 'store/actionCreators/releaseActionCreators';
import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';

import { RootState } from 'types/state';

const loadingSelector = createLoadingSelector(['FETCH_RELEASE']);

const mapStateToProps = (state: RootState): CompileStateProps => ({
  release: state.release.release,
  postMap: state.post.posts,
  postResults: state.post.results.map((id) => state.post.posts?.[id]),
  isLoading: loadingSelector(state)
});

const mapDispatchToProps: CompileDispatchProps = {
  fetchReleaseByDate,
  createRelease,
  updateReleaseById,
  fetchPostsByDate,
  openModal
};

const connector = connect<CompileStateProps, CompileDispatchProps, CompilePassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Compile);
