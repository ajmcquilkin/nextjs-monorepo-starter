import Submission from 'components/submissions/submission';
import { Post } from 'types/post';
import { useSkeletonLoading } from 'components/helpers/skeletonArea';

import styles from './submissionSection.module.scss';

export interface SubmissionSectionProps {
  title: string,
  posts: Post[]
}

const SubmissionSection = ({
  title, posts
}: SubmissionSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <div className={styles.submissionSectionContainer}>
      <h3>{`${title} (${posts.length})`}</h3>
      <div>
        {isLoading ? (
          <div style={{ background: 'gray', width: '100%', height: '100px' }} />
        ) : posts.map((post) => (
          <Submission
            key={post._id}
            postContent={post}
          />
        ))}
      </div>
    </div>
  );
};

export default SubmissionSection;
