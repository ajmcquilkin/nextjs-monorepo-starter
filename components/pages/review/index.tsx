import { useEffect, useState } from 'react';

import MainWrapper from 'components/layout/mainWrapper';
import { fetchAllPosts as fetchAllPostsImport } from 'store/actionCreators/postActionCreators';
import { Post, PostPublishType, PostStatus } from 'types/post';

import styles from 'components/pages/review/review.module.scss';
import Submission from 'components/submissions/submission';

export interface ReviewPassedProps {

}

export interface ReviewStateProps {
  currentPosts: Post[]
}

export interface ReviewDispatchProps {
  fetchAllPosts: typeof fetchAllPostsImport
}

export type ReviewProps = ReviewPassedProps & ReviewStateProps & ReviewDispatchProps;

const Review = ({ currentPosts, fetchAllPosts }: ReviewProps): JSX.Element => {
  useEffect(() => { fetchAllPosts(); }, []);

  const [status, setStatus] = useState<PostStatus | ''>('pending');
  const [publishType, setPublishType] = useState<PostPublishType | ''>('');

  const filteredPosts = currentPosts;

  // const filteredPosts = currentPosts.filter((post) => {
  //   if (status && post.status !== status) return false;
  //   if (publishType && post.type !== publishType) return false;
  //   return true;
  // }).sort((p1, p2) => {
  //   if (p1.type < p2.type || p1.status < p2.status || p1.briefContent < p2.briefContent) return -1;
  //   return 1;
  // });

  return (
    <MainWrapper>
      <div className={styles.submissions}>
        <div className={styles.topBar}>
          <div className="reviewStatusContainer">
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus((e.target.value) as (PostStatus | ''))}
            >
              <option value="">View All</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="published">Published</option>
            </select>
          </div>

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
          {/* TODO: Use correct button states */}
          {filteredPosts.map((post) => (
            <Submission
              key={post._id}
              postContent={post}
            />
          ))}
        </div>
      </div>
    </MainWrapper>
  );
};

export default Review;
