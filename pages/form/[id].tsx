import { GetServerSideProps, GetStaticPropsResult } from 'next';
import { connect } from 'react-redux';

import Form, {
  FormProps, FormStateProps, FormDispatchProps, FormPassedProps
} from 'components/pages/form';

import {
  createPost, fetchAllPosts, fetchPostById, updatePostById
} from 'store/actionCreators/postActionCreators';
import { setError } from 'store/actionCreators/requestActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState, ownProps: FormProps): FormStateProps => ({
  itemIsLoading: false,
  itemErrorMessage: '',
  isAuthenticated: state.user.isAuthenticated,
  isReviewer: false,

  groups: [],
  netId: '',
  post: state.post.posts?.[ownProps.id] || null
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
