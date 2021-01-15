import MainWrapper from 'components/layout/mainWrapper';
import { useEffect, useMemo } from 'react';
import { Post } from 'types/post';

export interface HomeProps {
  posts: Post[],
  fetchPosts?: () => void,
}

const Home = ({ posts, fetchPosts }: HomeProps): JSX.Element => {
  useEffect(() => {
    if (fetchPosts) { fetchPosts(); }
  }, []);

  const itemArray = useMemo(() => Object.values(posts), [posts]);
  itemArray.sort((a, b) => a.publishOrder - b.publishOrder);

  return (
    <MainWrapper>
      <div>Homepage</div>
    </MainWrapper>
  );
};

export default Home;
