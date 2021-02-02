import { GetStaticProps } from 'next';

import Home, { HomePassedProps } from 'components/pages/home';
import { fetchReleaseByDateRequest } from 'store/requests/releaseRequests';

import { getMidnightDate } from 'utils';
import { FetchReleaseData } from 'types/release';

export const getStaticProps: GetStaticProps<HomePassedProps> = async () => {
  const currentDate = getMidnightDate(Date.now());

  const { data: { data: { posts, release } } } = await fetchReleaseByDateRequest<FetchReleaseData>(currentDate)();
  const releasePostMap = posts.reduce((accum, post) => ({ ...accum, [post._id]: post }), {});

  return ({
    props: { release, releasePostMap },
    revalidate: 3600
  });
};

export default Home;
