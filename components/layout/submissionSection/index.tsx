import Submission from 'components/submissions/submission';

import { Post } from 'types/post';
import styles from './submissionSection.module.scss';

export interface SubmissionSectionProps {
  title: string,
  posts: Post[]
}

const SubmissionSection = ({
  title, posts
}: SubmissionSectionProps): JSX.Element => (
  <div className={styles.submissionSectionContainer}>
    <h3>{`${title} (${posts.length})`}</h3>
    <div>
      {posts.map((post) => (
        <Submission
          key={post._id}
          postContent={post}
        />
      ))}
    </div>
  </div>
);

export default SubmissionSection;
