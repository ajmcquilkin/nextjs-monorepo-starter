import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

import { Post } from 'types/post';

export interface HomeSubmissionProps {
  content: Post
}

const HomeSubmission = ({ content }: HomeSubmissionProps): JSX.Element => {
  const sanitizedHTML = sanitizeHtml(content.fullContent);

  return (
    <div>
      <div>
        <h3>{content.briefContent}</h3>
        <p>
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

      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

      <div>
        <img src="/icons/link.svg" alt="link chain" />
        <Link href={content.url}><a>{content.url}</a></Link>
      </div>
    </div>
  );
};

export default HomeSubmission;
