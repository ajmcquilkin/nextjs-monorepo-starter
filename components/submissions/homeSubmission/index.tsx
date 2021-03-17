import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

import { getFullDate, handleEncodeTime } from 'utils';
import { Post } from 'types/post';

import styles from './homeSubmission.module.scss';

export interface HomeSubmissionProps {
  content: Post
}

const HomeSubmission = ({ content }: HomeSubmissionProps): JSX.Element => {
  const sanitizedHTML = sanitizeHtml(content.fullContent);

  return (
    <div className={styles.homeSubmissionContainer}>
      <div className={styles.postContentContainer}>
        <div>
          <h3>{content.briefContent}</h3>
          <p className={styles.subheader}>
            {content.fromName}
            {content.eventDate && content.eventTime ? (
              <>
                {' '}
                &bull;
                {' '}
                {getFullDate(content.eventDate)}
                {', '}
                {handleEncodeTime(content.eventTime)}
              </>
            ) : null}
          </p>
        </div>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

        {content.url && (
          <div className={styles.linkContainer}>
            <img src="/icons/link.svg" alt="link chain" aria-hidden="true" />
            <Link href={content.url}><a>{content.url}</a></Link>
          </div>
        )}
      </div>

      {content.featuredImage ? <img className={styles.featuredImage} src={content.featuredImage} alt={content.featuredImageAlt} /> : null}
    </div>
  );
};

export default HomeSubmission;
