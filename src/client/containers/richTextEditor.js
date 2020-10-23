import React from 'react';
import RichTextEditor from 'react-rte';
import parse from 'html-react-parser';
import '../styles/richTextEditor.scss';

function MyEditor({ onChange, value }) {
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

  const content = value.toString('html');
  const contentNoTags = content.replace(/(<([^>]+)>)/ig, '');

  // messy fix for initializing state from props without constructor
  // if (contentNoTags === '' && props.content) {
  //   setState({ value: RichTextEditor.createValueFromString(props.content, 'html') });
  // }

  return (
    <div>
      <RichTextEditor
        value={value}
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
