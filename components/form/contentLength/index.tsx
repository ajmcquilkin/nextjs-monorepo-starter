import styles from './contentLength.module.scss';

export interface ContentLengthProps {
  contentLength: number,
  maxContentLength: number,
  className?: string,
}

const ContentLength = ({ contentLength, maxContentLength, className = '' }: ContentLengthProps): JSX.Element => (
  <div className={className}>
    <p className={[styles.contentLengthContainer, contentLength <= maxContentLength ? '' : styles.invalid].join(' ')}>
      {contentLength}
      /
      {maxContentLength}
      {' '}
      characters
    </p>
  </div>
);

export default ContentLength;
