import { GetStaticProps } from 'next';

import Home, { HomePassedProps } from 'components/pages/home';
import { fetchReleaseByDateRequest } from 'store/requests/releaseRequests';
import { FetchReleaseData } from 'types/release';

export const getStaticProps: GetStaticProps<HomePassedProps> = async () => {
  // TODO: make helper function to get correct date from passed number
  const date = 0;

  // TODO: refactor return types into request functions
  const { data: { data: { posts, release } } } = await fetchReleaseByDateRequest<FetchReleaseData>(date)();
  const releasePostMap = posts.reduce((accum, post) => ({ ...accum, [post._id]: post }), {});

  return ({ props: { release, releasePostMap } });
};

export default Home;
