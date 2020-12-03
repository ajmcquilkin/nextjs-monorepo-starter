import React from 'react';
import RichTextEditor from 'react-rte';

import ContentLengthChecker from '../components/ContentLengthChecker';
import { maxContentLength } from '../constants';

import '../styles/richTextEditor.scss';

// RTE Reference: https://github.com/sstur/react-rte/blob/master/src/EditorDemo.js

function MyEditor({ onChange, value }) {
  const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' }
    ]
  };

  const content = value.toString('html');
  const contentNoTags = content.replace(/(<([^>]+)>)/ig, '');

  return (
    <div className="rte-container">
      <RichTextEditor
        value={value}
        onChange={onChange}
        toolbarConfig={toolbarConfig}
        className="rte-embedded-container"
        toolbarClassName="rte-toolbar-container"
        editorClassName="rte-editor-container"
      />

      <ContentLengthChecker
        contentLength={contentNoTags.length}
        maxContentLength={maxContentLength}
        className="rte-char-count"
      />
    </div>
  );
}

export default MyEditor;
