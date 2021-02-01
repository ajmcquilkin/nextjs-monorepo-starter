import Link from 'next/link';
import { useState, useEffect } from 'react';

import MainWrapper from 'components/layout/mainWrapper';
import SubmissionSection from 'components/layout/submissionSection';

import {
  createPost as createPostImport,
  fetchAllPosts as fetchAllPostsImport,
  deletePostById as deletePostByIdImport
} from 'store/actionCreators/postActionCreators';
import { Post, PostStatus } from 'types/post';

import styles from './submissions.module.scss';

export interface SubmissionsPassedProps {
  isAuthenticated: boolean,
}

export interface SubmissionsStateProps {
  userPosts: Post[]
}

export interface SubmissionsDispatchProps {
  createPost: typeof createPostImport,
  fetchAllPosts: typeof fetchAllPostsImport,
  deletePostById: typeof deletePostByIdImport
}

export type SubmissionsProps = SubmissionsPassedProps & SubmissionsStateProps & SubmissionsDispatchProps;

const Submissions = ({
  userPosts, fetchAllPosts
}: SubmissionsProps): JSX.Element => {
  useEffect(() => { fetchAllPosts(); }, []);
  const [status, setStatus] = useState<PostStatus | ''>('');
  const keywordFilter = (postsToFilter: Post[], keyword: PostStatus): Post[] => postsToFilter.filter((post) => post.status === keyword);

  const filteredPosts = userPosts.filter((post) => (status ? post.status === status : true));

  return (
    <MainWrapper>
      <div className={styles.submissionsContainer}>
        <div className={styles.topBar}>
          <div className={styles.filterContainer}>
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
          <div className="button-container">
            <Link href="/form/new">
              <button className="new-button" type="button">
                <i className="fa fa-plus-square" />
                {'   '}
                New Submission
              </button>
            </Link>
          </div>

        </div>
        <div className={styles.submissionsContainer}>
          {(!status || status === 'draft') && <SubmissionSection title="Drafts" posts={keywordFilter(filteredPosts, 'draft')} />}
          {(!status || status === 'pending') && <SubmissionSection title="Pending" posts={keywordFilter(filteredPosts, 'pending')} />}
          {(!status || status === 'rejected') && <SubmissionSection title="Rejected" posts={keywordFilter(filteredPosts, 'rejected')} />}
          {(!status || status === 'approved') && <SubmissionSection title="Approved" posts={keywordFilter(filteredPosts, 'approved')} />}
          {(!status || status === 'published') && <SubmissionSection title="Published" posts={keywordFilter(filteredPosts, 'published')} />}
        </div>
      </div>
    </MainWrapper>
  );
};

export default Submissions;
