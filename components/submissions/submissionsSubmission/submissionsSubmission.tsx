import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

import { openModal as openModalImport } from 'store/actionCreators/modalActionCreators';
import { createPost as createPostImport } from 'store/actionCreators/postActionCreators';

import { getColorsForStatus, getFullDate, uppercaseFirstLetter, handleEncodeTime } from 'utils';

import { Post } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

import styles from './submissionsSubmission.module.scss';

export interface SubmissionPassedProps {
  postContent: Post,
  renderAdditionalButtons?: (_id: string) => JSX.Element[],
  renderAdditionalIcons?: (_id: string) => JSX.Element[]
}

export interface SubmissionStateProps {

}

export interface SubmissionDispatchProps {
  openModal: ConnectedThunkCreator<typeof openModalImport>,
  createPost: ConnectedThunkCreator<typeof createPostImport>,
}

export type SubmissionProps = SubmissionPassedProps & SubmissionStateProps & SubmissionDispatchProps;

const Submission = ({
  postContent,
  renderAdditionalButtons, renderAdditionalIcons,
  openModal, createPost
}: SubmissionProps): JSX.Element => {
  const sanitizedHTML = sanitizeHtml(postContent.fullContent);

  const duplicatePost = (): void => {
    const { _id, ...fields } = postContent;
    createPost({ ...fields, status: 'draft' });
  };

  return (
    <div className={styles.submissionContainer} style={{ borderLeftColor: getColorsForStatus(postContent.status).primary }}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h3>{postContent.briefContent}</h3>
          <div className={styles.iconContainer}>{renderAdditionalIcons ? renderAdditionalIcons(postContent._id) : null}</div>
        </div>

        <p>
          {postContent.type === 'event' && postContent.eventDate && postContent.eventTime
            && (
              <>
                {getFullDate(postContent.eventDate)}
                {', '}
                {handleEncodeTime(postContent.eventTime)}
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
            <img src="/icons/duplicate.svg" alt="duplicate post" aria-hidden="true" />
            <p>Duplicate</p>
          </button>

          <button
            type="button"
            onClick={() => openModal('DISCARD_POST_MODAL', { postId: postContent._id, action: 'DELETE' })}
          >
            <img src="/icons/discard.svg" alt="discard post" aria-hidden="true" />
            <p>Discard</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submission;
