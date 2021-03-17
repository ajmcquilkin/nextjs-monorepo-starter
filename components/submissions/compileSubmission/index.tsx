import Link from 'next/link';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

import { Post } from 'types/post';
import styles from './compileSubmission.module.scss';
import { getFullDate, handleEncodeTime } from 'utils';

export interface CompileSubmissionProps {
  postContent: Post,
  handleEdit: (_id: string) => void,
  handleReject: (_id: string) => void
}

const CompileSubmission = ({ postContent, handleEdit, handleReject }: CompileSubmissionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sanitizedHTML = sanitizeHtml(postContent.fullContent);

  return (
    <div className={styles.compileSubmissionContainer}>
      <div className={[styles.collapsedContentContainer, isOpen ? styles.open : ''].join(' ')}>
        <img className={styles.grabIcon} src="/icons/grab.svg" alt="selection dots" role="presentation" />
        <p>{postContent.briefContent}</p>
        <button
          aria-label="view more post information"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fillRule="evenodd"
          >
            <title>
              {isOpen ? 'Close' : 'Open'}
              {' '}
              drop down
            </title>
            <path d="M10 0L5 5 0 0z" />
          </svg>
        </button>
      </div>

      <div
        aria-hidden={!isOpen}
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {isOpen && (
          <div className={styles.mainContentContainer}>
            <div className={styles.titleContainer}>
              <h4>{postContent.briefContent}</h4>
              <p>
                {postContent.fromName}
                {' '}
                &bull;
                {' '}
                {postContent.eventDate && postContent.eventTime ? (
                  <>
                  {' '}
                  {getFullDate(postContent.eventDate)}
                  {', '}
                  {handleEncodeTime(postContent.eventTime)}
                  {' '}
                  &bull;
                  {' '}
                  </>
                ) : null}
                {' '}
                {postContent.recipientGroups.join(', ')}
                {' '}
              </p>
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
              {postContent.featuredImage && <img src={postContent.featuredImage} alt="featured post" />}
            </div>

            <div className={styles.footerContainer}>
              <Link href={postContent.url}>
                <a>{postContent.url}</a>
              </Link>

              <div className={styles.buttonContainer}>
                <button className={styles.edit} type="button" onClick={() => handleEdit(postContent._id)}>
                  <img src="/icons/edit.svg" alt="edit post" />
                  <p>Edit</p>
                </button>

                <button className={styles.reject} type="button" onClick={() => handleReject(postContent._id)}>
                  <img src="/icons/reject.svg" alt="reject post" />
                  <p>Reject</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompileSubmission;
