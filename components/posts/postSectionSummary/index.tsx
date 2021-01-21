import { Post } from 'types/post';
import styles from 'components/posts/postSectionSummary/postSectionSummary.module.scss';

export interface PostSectionSummaryProps {
  title: string,
  posts: Post[],
  hideFrom?: boolean
}

const PostSectionSummary = ({
  title, posts, hideFrom = false
}: PostSectionSummaryProps): JSX.Element => (
  <div className={styles.postSummaryContainer}>
    <h4>{`${title} (${posts.length})`}</h4>
    <ul>
      {posts.map(({ briefContent, fromName, _id }) => (
        <li key={_id}>
          {briefContent}
          {fromName && !hideFrom ? ` (${fromName})` : ''}
        </li>
      ))}
    </ul>
  </div>
);

export default PostSectionSummary;
