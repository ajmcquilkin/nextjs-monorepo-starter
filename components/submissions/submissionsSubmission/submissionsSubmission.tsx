import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

import {
  createPost as createPostImport,
  deletePostById as deletePostByIdImport
} from 'store/actionCreators/postActionCreators';

import { getColorsForStatus, getFullDate, uppercaseFirstLetter } from 'utils';

import { Post } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './submissionsSubmission.module.scss';

export interface SubmissionPassedProps {
  postContent: Post,
  renderAdditionalButtons?: (_id: string) => JSX.Element[]
}

export interface SubmissionStateProps {

}

export interface SubmissionDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  deletePostById: ConnectedThunkCreator<typeof deletePostByIdImport>
}

export type SubmissionProps = SubmissionPassedProps & SubmissionStateProps & SubmissionDispatchProps;

const Submission = ({
  postContent,
  createPost, deletePostById, renderAdditionalButtons
}: SubmissionProps): JSX.Element => {
  const sanitizedHTML = sanitizeHtml(postContent.fullContent);

  const duplicatePost = (): void => {
    const { _id, ...fields } = postContent;
    createPost(fields);
  };

  return (
    <div className={styles.submissionContainer} style={{ borderLeftColor: getColorsForStatus(postContent.status).primary }}>
      <div className={styles.header}>
        <h3>{postContent.briefContent}</h3>
        <p>
          {postContent.type === 'event' && postContent.eventDate
            && (
              <>
                {getFullDate(postContent.eventDate)}
                {' '}
                &bull;
                {' '}
              </>
            )}
          {uppercaseFirstLetter(postContent.type)}
          {' '}
          &bull;
          {' '}
          <span style={{ color: getColorsForStatus(postContent.status).primary }}>{uppercaseFirstLetter(postContent.status)}</span>
        </p>
      </div>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

      <div className={styles.bottomContainer}>
        <Link href={postContent.url}>
          <a>{postContent.url}</a>
        </Link>

        <div className={styles.buttonContainer}>
          {renderAdditionalButtons ? renderAdditionalButtons(postContent._id) : null}

          <button
            type="button"
            onClick={() => duplicatePost()}
          >
            <img src="/icons/duplicate.svg" alt="duplicate post" />
            <p>Duplicate</p>
          </button>

          <button
            type="button"
            onClick={() => deletePostById(postContent._id)}
          >
            <img src="/icons/discard.svg" alt="discard post" />
            <p>Discard</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submission;
