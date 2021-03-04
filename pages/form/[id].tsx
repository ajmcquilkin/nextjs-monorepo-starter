import { GetServerSideProps, GetStaticPropsResult } from 'next';
import { connect } from 'react-redux';

import Form, {
  FormProps, FormStateProps, FormDispatchProps, FormPassedProps
} from 'components/pages/form';

import { openModal } from 'store/actionCreators/modalActionCreators';
import {
  createPost, fetchPostById, updatePostById, deletePostById
} from 'store/actionCreators/postActionCreators';
import { createLoadingSelector, setError } from 'store/actionCreators/requestActionCreators';

import { FormGroups } from 'utils';

import { RootState } from 'types/state';

const postLoadingSelector = createLoadingSelector(['FETCH_POST', 'DELETE_POST']);

const mapStateToProps = (state: RootState, ownProps: FormProps): FormStateProps => ({
  isAuthenticated: state.user.isAuthenticated,
  isReviewer: state.user.isReviewer,

  groups: FormGroups,
  netId: state.user.netId || '',

  postIsLoading: postLoadingSelector(state),
  postErrorMessage: '',
  post: state.post.posts?.[ownProps.id] || null
});

const mapDispatchToProps: FormDispatchProps = {
  fetchPostById,
  createPost,
  updatePostById,
  deletePostById,
  openModal,
  setError
};

const connector = connect<FormStateProps, FormDispatchProps, FormPassedProps>(mapStateToProps, mapDispatchToProps);

export const getServerSideProps: GetServerSideProps = async ({
  params
}): Promise<GetStaticPropsResult<FormPassedProps>> => ({
  props: { id: params?.id as string || '' }
});

export default connector(Form);
