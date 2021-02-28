import Submission from 'components/submissions/submission';
import { useSkeletonLoading } from 'components/helpers/skeletonArea';
import SubmissionSkeleton from 'components/submissions/submission/submission.skeleton';

import { Post, PostStatus } from 'types/post';

import styles from './submissionSection.module.scss';

export interface SubmissionSectionProps {
  title: string,
  posts: Post[],
  status: PostStatus,
  renderAdditionalPostButtons?: (_id: string) => JSX.Element[]
}

const SubmissionSection = ({
  title, posts, status,
  renderAdditionalPostButtons
}: SubmissionSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <div className={styles.submissionSectionContainer}>
      <h3>{`${title} (${posts.length})`}</h3>
      <div>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading
          ? <SubmissionSkeleton status={status} />
          : (posts.length
            ? posts.map((post) => (
              <div className={styles.submissionSpacingContainer} key={post._id}>
                <Submission
                  postContent={post}
                  renderAdditionalButtons={renderAdditionalPostButtons}
                />
              </div>
            )) : <p>No Posts</p>)}
      </div>
    </div>
  );
};

export default SubmissionSection;
