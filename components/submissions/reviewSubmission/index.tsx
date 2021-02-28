import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';
import { Post } from 'types/post';

export interface ReviewSubmissionProps {
  content: Post,
  onApprove: (_id: string) => void,
  onReject: (_id: string) => void
}

const ReviewSubmission = ({ content, onApprove, onReject }: ReviewSubmissionProps): JSX.Element => {
  const sanitizedHTML = sanitizeHtml(content.fullContent);

  return (
    <div>
      <div>
        <div>
          <h3>{content.briefContent}</h3>
          <p>{content.eventDate}</p>
        </div>

        <div>
          <p>{content.type}</p>
          <p>{content.status}</p>
        </div>
      </div>

      <div>
        <p>{content.fromName}</p>
        <p>{content.recipientGroups}</p>
      </div>

      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      <Link href={content.url}><a>{content.url}</a></Link>

      <div>
        <button type="button" onClick={() => onApprove(content._id)}>Approve</button>
        <a href={`/form/${content._id}`}>Edit</a>
        <button type="button" onClick={() => onReject(content._id)}>Reject</button>
      </div>
    </div>
  );
};

export default ReviewSubmission;
