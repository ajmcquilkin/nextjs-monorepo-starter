import { getColorsForStatus } from 'utils';
import { PostStatus } from 'types/post';
import styles from './submission.skeleton.module.scss';

export interface SubmissionSkeletonProps {
  status: PostStatus
}

const SubmissionSkeleton = ({ status }: SubmissionSkeletonProps): JSX.Element => (
  <div className={styles.submissionSkeletonContainer} style={{ borderLeftColor: getColorsForStatus(status).primary }}>
    <div className={styles.submissionSkeletonTitle} style={{ backgroundColor: getColorsForStatus(status).secondary }} />
    <div className={styles.submissionSkeletonContent} style={{ backgroundColor: getColorsForStatus(status).tertirary }} />
    <div className={styles.submissionSkeletonButtons} style={{ backgroundColor: getColorsForStatus(status).tertirary }} />
  </div>
);

export default SubmissionSkeleton;
