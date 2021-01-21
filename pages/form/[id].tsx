import { GetServerSideProps, GetStaticPropsResult } from 'next';
import { connect } from 'react-redux';

import Form, { FormStateProps, FormDispatchProps, FormPassedProps } from 'components/pages/form';

import {
  createPost, fetchAllPosts, fetchPostById, updatePostById
} from 'store/actionCreators/postActionCreators';
import { setError } from 'store/actionCreators/requestActionCreators';

import { RootState } from 'types/state';
import { Post } from 'types/post';

const mapStateToProps = (state: RootState): FormStateProps => ({
  itemIsLoading: false,
  itemErrorMessage: '',
  isAuthenticated: state.user.isAuthenticated,
  isReviewer: false,

  groups: [],
  netId: '',
  post: {} as Post
});

const mapDispatchToProps: FormDispatchProps = {
  fetchApproved: fetchAllPosts,
  fetchPostById,
  createPost,
  updatePostById,
  setError
};

const connector = connect<FormStateProps, FormDispatchProps, FormPassedProps>(mapStateToProps, mapDispatchToProps);

export const getServerSideProps: GetServerSideProps = async ({
  params
}): Promise<GetStaticPropsResult<FormPassedProps>> => ({
  props: { id: params?.id as string || '' }
});

export default connector(Form);
