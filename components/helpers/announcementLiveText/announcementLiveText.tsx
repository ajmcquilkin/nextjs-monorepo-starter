import { useState, useEffect } from 'react';

export interface AnnouncementLiveTextProps {
  content: string
}

const AnnouncementLiveText = ({ content }: AnnouncementLiveTextProps): JSX.Element => {
  const [displayContent, setDisplayContent] = useState<string | null>(null);

  useEffect(() => {
    if (content) {
      setDisplayContent(content);
      const timeout = setTimeout(() => setDisplayContent(null), 5000);
      return clearTimeout(timeout);
    }
  }, [content]);

  return (
    <span
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="text"
      className="visually-hidden"
    >
      {displayContent}
    </span>
  );
};

export default AnnouncementLiveText;
