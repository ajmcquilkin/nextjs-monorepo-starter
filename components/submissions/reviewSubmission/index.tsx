import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

import { getColorsForStatus, getFullDate, uppercaseFirstLetter } from 'utils';
import { Post } from 'types/post';

import styles from './reviewSubmission.module.scss';

export interface ReviewSubmissionProps {
  content: Post,
  onApprove: (_id: string) => void,
  onReject: (_id: string) => void
}

const ReviewSubmission = ({ content, onApprove, onReject }: ReviewSubmissionProps): JSX.Element => {
  const sanitizedHTML = sanitizeHtml(content.fullContent);

  return (
    <div className={styles.reviewSubmissionContainer} style={{ borderLeftColor: getColorsForStatus(content.status).primary }}>
      <div className={styles.titleContainer}>
        <h3>{content.briefContent}</h3>
        <p>
          {getFullDate(content.requestedPublicationDate)}
          {' '}
          &bull;
          {' '}
          {uppercaseFirstLetter(content.type)}
          {' '}
          &bull;
          {' '}
          <span>{uppercaseFirstLetter(content.status)}</span>
        </p>
      </div>

      {content.type === 'event' && <p className={styles.subtitle}>{getFullDate(content.eventDate ?? Date.now())}</p>}

      <p className={styles.sendingInfo}>
        {content.fromName}
        {' '}
        &bull;
        {' '}
        {content.recipientGroups.join(', ')}
      </p>

      <div className={styles.contentContainer}>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        <Link href={content.url}><a className={styles.contentLink}>{content.url}</a></Link>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.approve}
          type="button"
          onClick={() => onApprove(content._id)}
        >
          <img
            src="/icons/approve.svg"
            alt="approval check mark"
          />
          <p>Approve</p>
        </button>

        <a className={styles.edit} href={`/form/${content._id}`}>
          <img
            src="/icons/edit.svg"
            alt="edit highlighter"
          />
          <p>Edit</p>
        </a>

        <button
          className={styles.reject}
          type="button"
          onClick={() => onReject(content._id)}
        >
          <img
            src="/icons/reject.svg"
            alt="rejection cross"
          />
          <p>Reject</p>
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmission;
