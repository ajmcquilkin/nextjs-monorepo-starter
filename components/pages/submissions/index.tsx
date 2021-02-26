import Link from 'next/link';
import { useState, useEffect } from 'react';

import FilterBar from 'components/layout/filterBar';
import SearchBar from 'components/layout/searchBar';
import SubmissionSection from 'components/layout/submissionSection';

import SkeletonArea from 'components/helpers/skeletonArea';

import {
  createPost as createPostImport,
  fetchAllPosts as fetchAllPostsImport,
  deletePostById as deletePostByIdImport
} from 'store/actionCreators/postActionCreators';

import { Post, PostPublishType, PostStatus } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './submissions.module.scss';

export interface SubmissionsPassedProps {
  isAuthenticated: boolean,
}

export interface SubmissionsStateProps {
  userPosts: Post[],
  isLoading: boolean
}

export interface SubmissionsDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  fetchAllPosts: ConnectedThunkCreator<typeof fetchAllPostsImport>,
  deletePostById: ConnectedThunkCreator<typeof deletePostByIdImport>
}

export type SubmissionsProps = SubmissionsPassedProps & SubmissionsStateProps & SubmissionsDispatchProps;

const Submissions = ({
  userPosts, isLoading, fetchAllPosts
}: SubmissionsProps): JSX.Element => {
  useEffect(() => { fetchAllPosts(); }, []);
  const [status, setStatus] = useState<PostStatus | ''>('');
  const [postType, setPostType] = useState<PostPublishType | ''>('');
  const [query, setQuery] = useState<string>('');

  const getFilteredPosts = (
    keyword: PostStatus
  ): Post[] => userPosts.filter((post) => post.status === keyword
    && (!postType || post.type === postType)
    && (
      post.briefContent.toLowerCase().includes(query)
      || post.fullContent.toLowerCase().includes(query)
      || post.fromName.toLowerCase().includes(query)
    ));

  return (
    <SkeletonArea isLoading={isLoading}>
      <div className={styles.submissionsContainer}>
        <div className={styles.titleContainer}>
          <h1>Your Submissions</h1>
          <a href="https://communications.dartmouth.edu/faculty-and-staff/vox-daily-guidelines">
            Submission Guidelines
          </a>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterBarRow}>
            <div className={styles.buttonContainer}>
              <img src="/icons/add.svg" alt="create new submission icon" />
              <Link href="/form/new">
                <a className={styles.createButton}>
                  New Submission
                </a>
              </Link>
            </div>

            <div className={styles.searchBarContainer}>
              <SearchBar
                query={query}
                setQuery={setQuery}
              />
            </div>
          </div>

          <div className={styles.filterBarRow}>
            <div className={styles.selectContainer}>
              <FilterBar
                status={status}
                type={postType}
                setStatus={setStatus}
                setType={setPostType}
              />
            </div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          {(!status || status === 'draft') && <SubmissionSection title="Drafts" posts={getFilteredPosts('draft')} status="draft" />}
          {(!status || status === 'pending') && <SubmissionSection title="Pending" posts={getFilteredPosts('pending')} status="pending" />}
          {(!status || status === 'rejected') && <SubmissionSection title="Rejected" posts={getFilteredPosts('rejected')} status="rejected" />}
          {(!status || status === 'approved') && <SubmissionSection title="Approved" posts={getFilteredPosts('approved')} status="approved" />}
          {(!status || status === 'published') && <SubmissionSection title="Published" posts={getFilteredPosts('published')} status="published" />}
        </div>
      </div>
    </SkeletonArea>
  );
};

export default Submissions;
