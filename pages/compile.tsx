import { connect } from 'react-redux';

import Compile, { CompileStateProps, CompileDispatchProps, CompilePassedProps } from 'components/pages/compile';
import { fetchAllPosts } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): CompileStateProps => ({
  posts: Object.values(state.post.posts)
});

const mapDispatchToProps: CompileDispatchProps = {
  fetchAllPosts
};

const connector = connect<CompileStateProps, CompileDispatchProps, CompilePassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Compile);
