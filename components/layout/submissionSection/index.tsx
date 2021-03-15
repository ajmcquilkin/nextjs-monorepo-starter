import { useSkeletonLoading } from 'components/helpers/skeletonArea';
import Submission from 'components/submissions/submissionsSubmission';
import SubmissionSkeleton from 'components/submissions/submissionSkeleton';

import { Post, PostStatus } from 'types/post';

import styles from './submissionSection.module.scss';

export interface SubmissionSectionProps {
  title: string,
  posts: Post[],
  status: PostStatus,
  renderAdditionalPostButtons?: (_id: string) => JSX.Element[],
  renderAdditionalPostIcons?: (_id: string) => JSX.Element[]
}

const SubmissionSection = ({
  title, posts, status,
  renderAdditionalPostButtons, renderAdditionalPostIcons
}: SubmissionSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <div
      className={styles.submissionSectionContainer}
    >
      <h2>{`${title} (${posts.length})`}</h2>
      <div
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
      >
        {isLoading
          ? <SubmissionSkeleton status={status} />
          : (
            <>
              {posts.length
                ? posts.map((post) => (
                  <div className={styles.submissionSpacingContainer} key={post._id}>
                    <Submission
                      postContent={post}
                      renderAdditionalButtons={renderAdditionalPostButtons}
                      renderAdditionalIcons={renderAdditionalPostIcons}
                    />
                  </div>
                )) : <p className={styles.noContent}>No posts in this category.</p>}
            </>
          )}
      </div>
    </div>
  );
};

export default SubmissionSection;
