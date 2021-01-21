// import sanitizeHtml from 'sanitize-html';

import Link from 'next/link';
import { createPost as createPostImport, deletePostById as deletePostByIdImport } from 'store/actionCreators/postActionCreators';

import { Post, PostStatus } from 'types/post';
import styles from './submission.module.scss';

export interface SubmissionPassedProps {
  postContent: Post,
}

export interface SubmissionStateProps {

}

export interface SubmissionDispatchProps {
  createPost: typeof createPostImport,
  deletePostById: typeof deletePostByIdImport
}

export type SubmissionProps = SubmissionPassedProps & SubmissionStateProps & SubmissionDispatchProps;

const Submission = ({ postContent, createPost, deletePostById }: SubmissionProps): JSX.Element => {
  const color = (status: PostStatus) => {
    switch (status) {
    case 'draft':
      return '#7c7e80';
    case 'pending':
      return '#8a6996';
    case 'rejected':
      return '#E32D1C';
    case 'approved':
      return '#267ABA';
    case 'published':
      return '#424141';
    default:
      return '#FFFFFF';
    }
  };

  const duplicatePost = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...fields } = postContent;
    createPost(fields);
  };

  // const cleanHTML = sanitizeHtml(item.full_content);
  const editable: boolean = postContent.status === 'draft' || postContent.status === 'pending' || postContent.status === 'rejected';

  return (
    <div className={styles.submissionContainer} style={{ borderLeftColor: color(postContent.status) }}>
      <div className={styles.submissionContentContainer}>
        <h3>{postContent.briefContent}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        {/* <div dangerouslySetInnerHTML={{ __html: cleanHTML }} /> */}
        <a target="_blank" rel="noreferrer" href={postContent.url.startsWith('http') ? postContent.url : `http://${postContent.url}`}>{postContent.url}</a>
      </div>

      <div className={styles.submissionControlContainer}>
        <p>
          <p>{postContent.type}</p>
          {' '}
          &middot; Status:
          {' '}
          <b style={{ color: color(postContent.status) }}>
            {' '}
            <span style={{ color: color(postContent.status) }}>
              {' '}
              {postContent.status}
            </span>
          </b>
        </p>
        <div className={styles.submissionControlButtonContainer}>
          {editable && <button type="button" onClick={() => deletePostById(postContent._id)}>Delete</button>}
          <button type="button" onClick={() => duplicatePost()}>Duplicate</button>
          {editable && <Link href={`/form/${postContent._id}`}><button type="button">Edit</button></Link>}
        </div>
      </div>
    </div>
  );
};

export default Submission;
