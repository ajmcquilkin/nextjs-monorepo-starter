import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

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
            {content.recipientGroups.length ? (
              <>
                {' '}
                &bull;
                {' '}
                {content.recipientGroups.join(', ')}
              </>
            ) : null}
          </p>
        </div>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

        <div className={styles.linkContainer}>
          <img src="/icons/link.svg" alt="link chain" />
          <Link href={content.url}><a>{content.url}</a></Link>
        </div>
      </div>

      {content.featuredImage ? <img className={styles.featuredImage} src={content.featuredImage} alt="featured story" /> : null}
    </div>
  );
};

export default HomeSubmission;
