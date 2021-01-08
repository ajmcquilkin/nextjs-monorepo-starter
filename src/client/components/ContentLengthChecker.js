import React from 'react';
import '../styles/ContentLengthChecker.scss';

const ContentLengthChecker = ({ contentLength, maxContentLength, className = '' }) => (
  <p className={`clc-container${className ? ` ${className}` : ''}${contentLength <= maxContentLength ? '' : ' invalid'}`}>
    {contentLength}
    /
    {maxContentLength}
    {' '}
    characters
  </p>
);

export default ContentLengthChecker;
