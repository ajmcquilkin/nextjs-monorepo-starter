/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Reference: https://github.com/facebook/draft-js/issues/2332

import { useRef, useEffect, useState } from 'react';
import {
  Editor, EditorState, ContentState, convertFromRaw, RichUtils, DraftEditorCommand, DraftHandleValue, ContentBlock, DraftBlockType
} from 'draft-js';

import styles from './richTextEditor.module.scss';

export interface RichTextEditorProps {
  onChange: (...args: any) => void,
  incomingState: string,
  readOnly?: boolean
}

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const RichTextEditor = ({ onChange, incomingState, readOnly = false }: RichTextEditorProps): JSX.Element => {
  const editor = useRef<any>(null);
  const focusEditor = (): void => { editor.current?.focus(); };
  useEffect(() => { focusEditor(); }, []);

  const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyContentState));
  useEffect(() => { setEditorState(EditorState.createWithContent(ContentState.createFromText(incomingState))); }, []);

  const handleChange = (state: EditorState): void => {
    setEditorState(state);
    onChange(state.getCurrentContent().getPlainText());
  };

  const handleKeyCommand = (command: DraftEditorCommand, state: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) { handleChange(newState); return 'handled'; }
    return 'not-handled';
  };

  const handleToggleInlineStyle = (style: DraftEditorCommand) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleToggleBlockStyle = (block: ContentBlock) => {
    const type: DraftBlockType = block.getType();
    handleChange(RichUtils.toggleBlockType(editorState, type));

    if (type === 'unordered-list-item') { return styles.unorderedListBlock; }
    if (type === 'ordered-list-item') { return styles.orderedListBlock; }
    return '';
  };

  return (
    <div className={styles.rteContainer}>
      <button onClick={() => handleToggleInlineStyle('bold')} type="button">Bold</button>
      <button onClick={() => handleToggleInlineStyle('italic')} type="button">Italic</button>
      <button onClick={() => handleToggleInlineStyle('strikethrough')} type="button">Strikethrough</button>
      <button onClick={() => handleToggleInlineStyle('underline')} type="button">Underline</button>

      {/* <button onClick={() => handleToggleBlockStyle('unordered-lis')} type="button">Unordered List</button>
      <button onClick={() => handleToggleBlockStyle('')} type="button">Ordered List</button> */}
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        blockStyleFn={handleToggleBlockStyle}
      />
    </div>
  );
};

export { EditorState, ContentState };
export default RichTextEditor;
