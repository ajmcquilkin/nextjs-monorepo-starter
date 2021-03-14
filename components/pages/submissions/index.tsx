import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import FilterBar from 'components/layout/filterBar';
import SearchBar from 'components/layout/searchBar';
import SubmissionSection from 'components/layout/submissionSection';

import SkeletonArea from 'components/helpers/skeletonArea';

import {
  createPost as createPostImport,
  fetchAllPosts as fetchAllPostsImport,
  updatePostById as updatePostByIdImport,
  deletePostById as deletePostByIdImport
} from 'store/actionCreators/postActionCreators';

import { Post, PostPublishType, PostStatus } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './submissions.module.scss';

export interface SubmissionsPassedProps {
  isAuthenticated: boolean
}

export interface SubmissionsStateProps {
  userPosts: Post[],
  isLoading: boolean
}

export interface SubmissionsDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  fetchAllPosts: ConnectedThunkCreator<typeof fetchAllPostsImport>,
  updatePostById: ConnectedThunkCreator<typeof updatePostByIdImport>,
  deletePostById: ConnectedThunkCreator<typeof deletePostByIdImport>
}

export type SubmissionsProps = SubmissionsPassedProps & SubmissionsStateProps & SubmissionsDispatchProps;

const Submissions = ({
  userPosts, isLoading,
  fetchAllPosts, updatePostById
}: SubmissionsProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => { fetchAllPosts(); }, []);

  const [status, setStatus] = useState<PostStatus | ''>('');
  const [postType, setPostType] = useState<PostPublishType | ''>('');
  const [query, setQuery] = useState<string>('');

  const getFilteredPosts = (
    keyword: PostStatus
  ): Post[] => userPosts.filter((post) => post.status === keyword
    && (!postType || post.type === postType)
    && (
      post.briefContent.toLowerCase().includes(query.toLowerCase())
      || post.fullContent.toLowerCase().includes(query.toLowerCase())
      || post.fromName.toLowerCase().includes(query.toLowerCase())
    ));

  return (
    <SkeletonArea isLoading={isLoading}>
      <div className={styles.submissionsContainer}>
        <div className={styles.titleContainer}>
          <h1>Your Submissions</h1>
          <Link href="https://communications.dartmouth.edu/faculty-and-staff/vox-daily-guidelines">
            <a target="_blank" rel="noopener noreferrer">Submission Guidelines</a>
          </Link>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterBarRow}>
            <button
              type="button"
              onClick={() => router.push('/form/new')}
              className={styles.buttonContainer}
            >
              <img src="/icons/add.svg" alt="create new submission icon" />
              <p className={styles.createButton}>New Submission</p>
            </button>

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
          {(!status || status === 'draft') && (
            <SubmissionSection
              title="Drafts"
              posts={getFilteredPosts('draft')}
              status="draft"
              renderAdditionalPostButtons={(_id) => ([
                <button
                  type="button"
                  onClick={() => router.push(`/form/${_id}`)}
                  key="0"
                >
                  <img src="/icons/edit.svg" alt="edit post" />
                  <p>Edit</p>
                </button>
              ])}
            />
          )}

          {(!status || status === 'pending') && (
            <SubmissionSection
              title="Pending"
              posts={getFilteredPosts('pending')}
              status="pending"
            />
          )}

          {(!status || status === 'rejected') && (
            <SubmissionSection
              title="Rejected"
              posts={getFilteredPosts('rejected')}
              status="rejected"
              renderAdditionalPostButtons={(_id) => ([
                <button
                  type="button"
                  onClick={() => updatePostById(_id, { status: 'pending' })}
                  key="0"
                >
                  <img src="/icons/resubmit.svg" alt="resubmit post" />
                  <p>Resubmit</p>
                </button>
              ])}
            />
          )}

          {(!status || status === 'approved') && (
            <SubmissionSection
              title="Approved"
              posts={getFilteredPosts('approved')}
              status="approved"
            />
          )}

          {(!status || status === 'published') && (
            <SubmissionSection
              title="Published"
              posts={getFilteredPosts('published')}
              status="published"
            />
          )}

        </div>
      </div>
    </SkeletonArea>
  );
};

export default Submissions;
