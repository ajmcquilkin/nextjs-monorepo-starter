import { GetStaticProps } from 'next';
import Home, { HomeProps } from 'components/pages/home';

const props: HomeProps = {
  posts: [],
};

export const getStaticProps: GetStaticProps = async () => ({ props });

export default Home;
