import React, { useState } from 'react';
import RichTextEditor from 'react-rte';

function MyEditor(props) {
  const [state, setState] = useState({
    value: RichTextEditor.createEmptyValue()
  });

  const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'IMAGE_BUTTON'],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' }
    ]
  };

  const onChange = (value) => {
    setState({ value });
    if (props.onChange) {
      props.onChange(
        value.toString('html')
      );
    }
  };

  return (
    <RichTextEditor
      value={state.value}
      onChange={onChange}
      toolbarConfig={toolbarConfig}
    />
  );
}

export default MyEditor;
