import React from 'react';
import RichTextEditor from 'react-rte';
import { maxContentLength } from '../constants';
import '../styles/richTextEditor.scss';

function MyEditor({ onChange, value, readOnly }) {
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
    <div>
      <RichTextEditor
        value={value}
        onChange={onChange}
        toolbarConfig={toolbarConfig}
        readOnly={readOnly}
      />
      <h6 style={{ color: contentNoTags.length > maxContentLength ? 'red' : null }}>
        {contentNoTags.length}
        /
        {maxContentLength}
        {' '}
        characters
      </h6>

    </div>
  );
}

export default MyEditor;
