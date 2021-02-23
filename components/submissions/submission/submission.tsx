import Link from 'next/link';
import { createPost as createPostImport, deletePostById as deletePostByIdImport } from 'store/actionCreators/postActionCreators';

import { getColorsForStatus } from 'utils';

import { Post } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './submission.module.scss';

export interface SubmissionPassedProps {
  postContent: Post,
}

export interface SubmissionStateProps {

}

export interface SubmissionDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  deletePostById: ConnectedThunkCreator<typeof deletePostByIdImport>
}

export type SubmissionProps = SubmissionPassedProps & SubmissionStateProps & SubmissionDispatchProps;

const Submission = ({ postContent, createPost, deletePostById }: SubmissionProps): JSX.Element => {
  const duplicatePost = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...fields } = postContent;
    createPost(fields);
  };

  const editable: boolean = postContent.status === 'draft' || postContent.status === 'pending' || postContent.status === 'rejected';

  return (
    <div className={styles.submissionContainer} style={{ borderLeftColor: getColorsForStatus(postContent.status).primary }}>
      <div className={styles.submissionContentContainer}>
        <h3>{postContent.briefContent}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        {/* <div dangerouslySetInnerHTML={{ __html: cleanHTML }} /> */}
        <a target="_blank" rel="noreferrer" href={postContent.url.startsWith('http') ? postContent.url : `http://${postContent.url}`}>{postContent.url}</a>
      </div>

      <div className={styles.submissionControlContainer}>
        <div>
          <p>{postContent.type}</p>
          {' '}
          &middot; Status:
          {' '}
          <b style={{ color: getColorsForStatus(postContent.status).primary }}>
            {' '}
            <span style={{ color: getColorsForStatus(postContent.status).primary }}>
              {' '}
              {postContent.status}
            </span>
          </b>
        </div>
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
