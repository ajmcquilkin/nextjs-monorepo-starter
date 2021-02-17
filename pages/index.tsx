import { GetStaticProps } from 'next';
import { connect } from 'react-redux';

import Home, { HomePassedProps, HomeStateProps, HomeDispatchProps } from 'components/pages/home';

import { fetchReleaseByDate } from 'store/actionCreators/releaseActionCreators';
import { fetchReleaseByDateRequest } from 'store/requests/releaseRequests';

import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): HomeStateProps => ({
  release: state?.release?.release || null,
  postMap: state?.post?.posts || {}
});

const mapDispatchToProps: HomeDispatchProps = {
  fetchReleaseByDate
};

const connector = connect<HomeStateProps, HomeDispatchProps, HomePassedProps>(mapStateToProps, mapDispatchToProps);

export const getStaticProps: GetStaticProps<HomePassedProps> = async () => {
  try {
    const currentDate = Date.now();

    const { data: { data: { posts, release } } } = await fetchReleaseByDateRequest(currentDate);
    const postMap = posts.reduce((accum, post) => ({ ...accum, [post._id]: post }), {});

    return ({
      props: { initialRelease: release, initialPostMap: postMap },
      revalidate: __REGENERATION_INTERVAL__
    });
  } catch (error) {
    return ({
      props: {
        initialRelease: null,
        initialPostMap: {}
      }
    });
  }
};

export default connector(Home);
