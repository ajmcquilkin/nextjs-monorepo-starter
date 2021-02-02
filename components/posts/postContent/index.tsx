import sanitizeHtml from 'sanitize-html';

import styles from 'components/posts/postContent/postContent.module.scss';
import { Post } from 'types/post';

export interface PostContentProps {
  content: Post
}

const PostContent = ({ content }: PostContentProps): JSX.Element => {
  const cleanHTML = sanitizeHtml(content.fullContent);

  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>
        <h4>{content.briefContent}</h4>
      </div>

      {
        content.type === 'announcement'
          ? (
            <h5>
              {content.fromName}
              {' '}
              {content.fromAddress}
            </h5>
          )
          : null
      }

      <div className={styles.itemPaddingContainer}>
        <div className={styles.itemContent} dangerouslySetInnerHTML={{ __html: cleanHTML }} />

        <a target="_blank" rel="noreferrer" href={content.url.startsWith('http') ? content.url : `http://${content.url}`}>{content.url}</a>
      </div>
    </div>
  );
};

export default PostContent;
