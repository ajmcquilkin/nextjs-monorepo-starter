import Link from 'next/link';
import { useState } from 'react';

import sanitizeHtml from 'sanitize-html';

import { Post } from 'types/post';

export interface CompileSubmissionProps {
  postContent: Post
}

const CompileSubmission = ({ postContent }: CompileSubmissionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sanitizedHTML = sanitizeHtml(postContent.fullContent);

  return (
    <div>
      <div>
        <h4>{postContent.briefContent}</h4>
        <h5>
          {postContent.fromName}
          {' '}
          &bull;
          {' '}
          {postContent.recipientGroups.join(', ')}
        </h5>
      </div>

      <div>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        {postContent.featuredImage && <img src={postContent.featuredImage} alt="featured post" />}
      </div>

      <div>
        <Link href={postContent.url}>
          <a>{postContent.url}</a>
        </Link>

        <div>
          <button type="button">
            <img src="/icons/edit.svg" alt="edit post" />
            <p>Edit</p>
          </button>

          <button type="button">
            <img src="/icons/reject.svg" alt="reject post" />
            <p>Reject</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompileSubmission;
