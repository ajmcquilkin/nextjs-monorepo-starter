import { useEffect, useState } from 'react';

import Submission from 'components/submissions/submission';

import { fetchWithStatus as fetchWithStatusImport } from 'store/actionCreators/postActionCreators';
import { Post, PostPublishType } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from 'components/pages/review/review.module.scss';

export interface ReviewPassedProps {

}

export interface ReviewStateProps {
  currentPosts: Post[],
  isLoading: boolean
}

export interface ReviewDispatchProps {
  fetchWithStatus: ConnectedThunkCreator<typeof fetchWithStatusImport>
}

export type ReviewProps = ReviewPassedProps & ReviewStateProps & ReviewDispatchProps;

const Review = ({ currentPosts, isLoading, fetchWithStatus }: ReviewProps): JSX.Element => {
  useEffect(() => { fetchWithStatus('pending'); }, []);

  const [publishType, setPublishType] = useState<PostPublishType | ''>('');

  const filteredPosts = currentPosts.filter((post) => {
    if (publishType && post.type !== publishType) return false;
    return true;
  }).sort((p1, p2) => {
    if (p1.type < p2.type || p1.briefContent < p2.briefContent) return -1;
    return 1;
  });

  return (
    <div className={styles.submissions}>
      <div className={styles.topBar}>
        <div className="reviewTypeContainer">
          <select
            name="type"
            value={publishType}
            onChange={(e) => setPublishType(e.target.value as (PostPublishType | ''))}
          >
            <option value="">View All</option>
            <option value="news">News</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
          </select>
        </div>
      </div>

      <div className={styles.submissionsContainer}>
        {isLoading
          ? <div style={{ background: 'gray', width: '100%', height: '100px' }} />
          : filteredPosts.map((post) => <Submission key={post._id} postContent={post} />)}
      </div>
    </div>
  );
};

export default Review;
