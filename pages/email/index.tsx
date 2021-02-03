import { GetServerSideProps } from 'next';

import * as postController from 'controllers/postController';
import { dbConnect } from 'utils/db';

import { Post } from 'types/post';

export interface EmailProps {
  posts: Post[]
}

const Email = ({ posts }: EmailProps): JSX.Element => (
  <div>
    Groups:
    <div>
      {posts.map((post) => <div key={post._id} dangerouslySetInnerHTML={{ __html: post.fullContent }} />)}
    </div>
  </div>
);

export const getServerSideProps: GetServerSideProps<EmailProps> = async ({ query }) => {
  const { group } = query;
  let groupsArray: string[];

  if (!group) groupsArray = [];
  else if (typeof group === 'string') groupsArray = [group];
  else groupsArray = [...group];

  await dbConnect();
  // const groupPosts = await postController.fetchPostsForGroups(groupsArray);
  const groupPosts = JSON.parse(JSON.stringify(await postController.fetchPostsForGroups(groupsArray)));

  console.log(groupPosts, typeof groupPosts);
  console.log(groupPosts[0]);

  return ({ props: { posts: groupPosts } });
};

export default Email;
