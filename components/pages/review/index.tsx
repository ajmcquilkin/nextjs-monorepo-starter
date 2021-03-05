import { useEffect, useState } from 'react';

import FilterBar from 'components/layout/filterBar';
import SearchBar from 'components/layout/searchBar';

// import Submission from 'components/submissions/submission';
import ReviewSubmission from 'components/submissions/reviewSubmission';
import SubmissionSkeleton from 'components/submissions/submissionSkeleton';

import { openModal as openModalImport } from 'store/actionCreators/modalActionCreators';
import { fetchWithStatus as fetchWithStatusImport, updatePostById as updatePostByIdImport } from 'store/actionCreators/postActionCreators';

import { Post, PostPublishType, PostStatus } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './review.module.scss';

export interface ReviewPassedProps {

}

export interface ReviewStateProps {
  currentPosts: Post[],
  isLoading: boolean
}

export interface ReviewDispatchProps {
  fetchWithStatus: ConnectedThunkCreator<typeof fetchWithStatusImport>,
  updatePostById: ConnectedThunkCreator<typeof updatePostByIdImport>,
  openModal: ConnectedThunkCreator<typeof openModalImport>
}

export type ReviewProps = ReviewPassedProps & ReviewStateProps & ReviewDispatchProps;

const Review = ({
  currentPosts, isLoading,
  fetchWithStatus, updatePostById, openModal
}: ReviewProps): JSX.Element => {
  useEffect(() => { fetchWithStatus('pending'); }, []);

  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<PostStatus | ''>('');
  const [type, setType] = useState<PostPublishType | ''>('');

  const filteredPosts = currentPosts
    .filter((post) => (!type || post.type === type)
      && (!status || post.status === status)
      && (!type || post.type === type)
      && (
        post.briefContent.toLowerCase().includes(query)
        || post.fullContent.toLowerCase().includes(query)
        || post.fromName.toLowerCase().includes(query)
      ))
    .sort((p1, p2) => (p1.type < p2.type || p1.briefContent < p2.briefContent ? -1 : 1));

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.titleContainer}>
        <h1>Review</h1>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <SearchBar
            query={query}
            setQuery={setQuery}
          />
        </div>

        <div className={styles.subtitleContainer}>
          <h2>Pending Posts</h2>

          <div className={styles.filterBarContainer}>
            <FilterBar
              status={status}
              type={type}
              setStatus={setStatus}
              setType={setType}
              hideStatus
            />
          </div>
        </div>
      </div>

      <div className={styles.submissionsContainter}>
        {isLoading
          ? (
            <>
              <div className={styles.submissionContainer}>
                <SubmissionSkeleton status="pending" />
              </div>
              <div className={styles.submissionContainer}>
                <SubmissionSkeleton status="pending" />
              </div>
            </>
          )
          : (
            <>
              {filteredPosts.length ? filteredPosts.map((post) => (
                <div key={post._id} className={styles.submissionContainer}>
                  <ReviewSubmission
                    content={post}
                    onApprove={(_id) => updatePostById(_id, { status: 'approved' })}
                    onReject={(_id) => openModal('REJECTION_MODAL', { postId: _id })}
                  />
                </div>
              )) : <p className={styles.noContent}>No pending posts.</p>}
              {' '}

            </>
          )}
      </div>
    </div>
  );
};

export default Review;
