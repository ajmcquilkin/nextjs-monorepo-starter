import { useState, useEffect } from 'react';

export interface AnnouncementLiveTextStateProps {
  content: string
}

export interface AnnouncementLiveTextDispatchProps {

}

export interface AnnouncementLiveTextPassedProps {

}

export type AnnouncementLiveTextProps = AnnouncementLiveTextStateProps & AnnouncementLiveTextDispatchProps & AnnouncementLiveTextPassedProps;

const AnnouncementLiveText = ({ content }: AnnouncementLiveTextProps): JSX.Element => {
  const [displayContent, setDisplayContent] = useState<string | null>(null);

  // eslint-disable-next-line consistent-return
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
