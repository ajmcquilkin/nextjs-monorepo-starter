import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import parse from 'html-react-parser';
import './styles.scss';

function MyEditor() {
  const [state, setState] = useState({
    value: RichTextEditor.createEmptyValue()
  });

  const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'IMAGE_BUTTON'],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' }
    ]
  };

  function onChange(value) {
    setState({ value });
  }

  const content = state.value.toString('html');
  const contentNoTags = content.replace(/(<([^>]+)>)/ig, '');

  return (
    <div>
      <RichTextEditor
        value={state.value}
        onChange={onChange}
        toolbarConfig={toolbarConfig}
      />
      <h6 style={{ color: contentNoTags.length > 500 ? 'red' : null }}>
        {contentNoTags.length}
        /500
      </h6>
      <div className="content-div">
        <h5>Content Preview:</h5>
        {parse(content)}
      </div>
    </div>
  );
}

export default MyEditor;
