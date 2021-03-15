export interface AnnouncementLiveTextProps {
  content: string
}

const AnnouncementLiveText = ({ content }: AnnouncementLiveTextProps): JSX.Element => (
  <span
    aria-live="assertive"
    aria-atomic="true"
    aria-relevant="text"
    className="visually-hidden"
  >
    {content}
  </span>
);

export default AnnouncementLiveText;
