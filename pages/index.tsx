import { GetStaticProps } from 'next';
import { connect } from 'react-redux';

import Home, { HomeStateProps, HomeDispatchProps, HomePassedProps } from 'components/pages/home';
import { fetchAllPosts } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): HomeStateProps => ({
  posts: Object.values(state.post.posts)
});

const mapDispatchToProps: HomeDispatchProps = {
  fetchPosts: fetchAllPosts
};

const connector = connect<HomeStateProps, HomeDispatchProps, HomePassedProps>(mapStateToProps, mapDispatchToProps);

const props: HomePassedProps = {};

export const getStaticProps: GetStaticProps = async () => ({ props });

export default connector(Home);
