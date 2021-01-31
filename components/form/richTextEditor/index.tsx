import { useRef, useEffect, useState } from 'react';

import {
  Editor, EditorState, ContentState,
  RichUtils, ContentBlock,
} from 'draft-js';

import BlockStyleControls from '../blockStyleControls';
import InlineStyleControls from '../inlineStyleControls';

import styles from './richTextEditor.module.scss';

export interface RichTextEditorProps {
  onChange: (...args: any) => void,
  incomingState: string
}

const RichTextEditor = ({ onChange, incomingState }: RichTextEditorProps): JSX.Element => {
  const editor = useRef<Editor>(null);
  const focusEditor = (): void => { editor.current?.focus(); };
  useEffect(() => { focusEditor(); }, []);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => { setEditorState(EditorState.createWithContent(ContentState.createFromText(incomingState))); }, []);

  const handleChange = (state: EditorState): void => {
    setEditorState(state);
    onChange(state.getCurrentContent().getPlainText());
  };

  // const handleKeyCommand = (command: DraftEditorCommand, state: EditorState): DraftHandleValue => {
  //   const newState = RichUtils.handleKeyCommand(state, command);
  //   if (newState) { handleChange(newState); return 'handled'; }
  //   return 'not-handled';
  // };

  const toggleBlockType = (blockType: string) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const getBlockStyle = (block: ContentBlock) => block.getType();

  return (
    <div className={styles.rteContainer}>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />

      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />

      <Editor
        ref={editor}
        editorState={editorState}
        onChange={handleChange}
        // handleKeyCommand={handleKeyCommand}
        blockStyleFn={getBlockStyle}
        spellCheck
      />
    </div>
  );
};

export default RichTextEditor;
