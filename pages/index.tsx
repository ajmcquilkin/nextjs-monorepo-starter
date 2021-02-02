import { GetStaticProps } from 'next';

import Home, { HomePassedProps } from 'components/pages/home';
import { fetchReleaseByDateRequest } from 'store/requests/releaseRequests';

import { FetchReleaseData } from 'types/release';

export const getStaticProps: GetStaticProps<HomePassedProps> = async () => {
  try {
    const currentDate = Date.now();

    const { data: { data: { posts, release } } } = await fetchReleaseByDateRequest<FetchReleaseData>(currentDate);
    const releasePostMap = posts.reduce((accum, post) => ({ ...accum, [post._id]: post }), {});

    return ({
      props: { release, releasePostMap },
      revalidate: __REGENERATION_INTERVAL__
    });
  } catch (error) {
    return ({
      props: {
        release: null,
        releasePostMap: {}
      }
    });
  }
};

export default Home;
