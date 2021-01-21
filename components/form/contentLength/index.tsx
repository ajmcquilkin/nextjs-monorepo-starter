import './contentLength.module.scss';

export interface ContentLengthProps {
  contentLength: number,
  maxContentLength: number,
  className?: string,
}

const ContentLength = ({ contentLength, maxContentLength, className = '' }: ContentLengthProps): JSX.Element => (
  <p className={`clc-container${className ? ` ${className}` : ''}${contentLength <= maxContentLength ? '' : ' invalid'}`}>
    {contentLength}
    /
    {maxContentLength}
    {' '}
    characters
  </p>
);

export default ContentLength;
