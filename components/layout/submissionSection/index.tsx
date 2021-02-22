import Submission from 'components/submissions/submission';
import { useSkeletonLoading } from 'components/helpers/skeletonArea';
import SubmissionSkeleton from 'components/submissions/submission/submission.skeleton';

import { Post, PostStatus } from 'types/post';

import styles from './submissionSection.module.scss';

export interface SubmissionSectionProps {
  title: string,
  posts: Post[],
  status: PostStatus
}

const SubmissionSection = ({
  title, posts, status
}: SubmissionSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <div className={styles.submissionSectionContainer}>
      <h3>{`${title} (${posts.length})`}</h3>
      <div>
        {isLoading
          ? <SubmissionSkeleton status={status} />
          : posts.map((post) => (
            <div className={styles.submissionSpacingContainer} key={post._id}>
              <Submission postContent={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubmissionSection;
