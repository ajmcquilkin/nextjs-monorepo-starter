// Reference: https://github.com/reduxjs/redux-thunk/blob/master/test/typescript.ts
// Reference: https://stackoverflow.com/questions/56872370/redux-thunk-with-typescript

import { GetStaticPropsResult } from 'next';
import { connect } from 'react-redux';

import Submissions, { SubmissionsPassedProps, SubmissionsStateProps, SubmissionsDispatchProps } from 'components/pages/submissions';
import { createPost, deletePostById, fetchAllPosts } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): SubmissionsStateProps => ({
  // userPosts: Object.values(state.post.posts).filter((post) => post.submitterNetId === state.user.netId)
  userPosts: Object.values(state.post.posts)
});

const mapDispatchToProps: SubmissionsDispatchProps = {
  createPost,
  fetchAllPosts,
  deletePostById
};

const connector = connect<SubmissionsStateProps, SubmissionsDispatchProps, SubmissionsPassedProps>(mapStateToProps, mapDispatchToProps);

const props: SubmissionsPassedProps = {
  isAuthenticated: true,
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<SubmissionsPassedProps>> => ({ props });

export default connector(Submissions);
