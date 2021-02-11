import styles from 'components/posts/postSection/postSection.module.scss';
import PostContent from 'components/posts/postContent';

import { Post } from 'types/post';

export interface PostSectionProps {
  title: string,
  subtitle?: string,
  posts: Post[]
}

const PostSection = ({ title, subtitle, posts: postList = [] }: PostSectionProps): JSX.Element => (
  <div className={styles.postSectionContainer}>
    <div className="section-bar" />

    <div className={styles.postSectionTitleContainer}>
      {/* <h3>{title}</h3> */}
      <p>{subtitle}</p>
    </div>

    <div>{postList.map((post) => <PostContent key={post._id} content={post} />)}</div>
  </div>
);

export default PostSection;
