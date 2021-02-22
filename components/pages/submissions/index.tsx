import Link from 'next/link';
import { useState, useEffect, FormEvent } from 'react';

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
  ): Post[] => userPosts.filter((post) => post.status === keyword && (!postType || post.type === postType));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <SkeletonArea isLoading={isLoading}>
      <div className={styles.submissionsContainer}>
        <div className={styles.titleContainer}>
          <h1>Your Submissions</h1>
          <a>Submission Guidelines</a>
        </div>

        <form className={styles.filterBar} onSubmit={handleSubmit}>
          <div className={styles.filterBarRow}>
            <div className={styles.buttonContainer}>
              <img src="/add.svg" alt="create new submission icon" />
              <Link href="/form/new">
                <a className={styles.createButton}>New Submission</a>
              </Link>
            </div>

            <div className={styles.searchContainer}>
              <button type="submit"><img src="/search.svg" alt="magnifying glass" /></button>
              <input value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          <div className={styles.filterBarRow}>
            <div className={styles.selectContainer}>
              <p>Status</p>
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

            <div className={styles.selectContainer}>
              <p>Type</p>
              <select
                name="postType"
                value={postType}
                onChange={(e) => setPostType((e.target.value) as (PostPublishType | ''))}
              >
                <option value="">View All</option>
                <option value="news">News</option>
                <option value="announcement">Announcement</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>
        </form>

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
