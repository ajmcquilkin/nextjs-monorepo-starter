import { useRef, useEffect } from 'react';

import {
  Editor, EditorState,
  RichUtils, ContentBlock,
  DraftEditorCommand, DraftHandleValue
} from 'draft-js';

import BlockStyleControls from 'components/form/blockStyleControls';
import InlineStyleControls from 'components/form/inlineStyleControls';

import styles from './richTextEditor.module.scss';

export interface RichTextEditorProps {
  onChange: (state: EditorState) => void,
  incomingState: EditorState
}

const RichTextEditor = ({ onChange, incomingState }: RichTextEditorProps): JSX.Element => {
  const editor = useRef<Editor>(null);
  const focusEditor = (): void => { editor.current?.focus(); };
  useEffect(() => { focusEditor(); }, []);

  const handleChange = (state: EditorState): void => {
    onChange(state);
  };

  const handleKeyCommand = (command: DraftEditorCommand, state: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) { handleChange(newState); return 'handled'; }
    return 'not-handled';
  };

  const toggleBlockType = (blockType: string) => {
    handleChange(RichUtils.toggleBlockType(incomingState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    handleChange(RichUtils.toggleInlineStyle(incomingState, inlineStyle));
  };

  const getBlockStyle = (block: ContentBlock) => block.getType();

  return (
    <div className={styles.rteContainer}>
      <div className={styles.rteMenuContainer}>
        <InlineStyleControls
          editorState={incomingState}
          onToggle={toggleInlineStyle}
        />

        <BlockStyleControls
          editorState={incomingState}
          onToggle={toggleBlockType}
        />
      </div>

      <Editor
        ref={editor}
        editorState={incomingState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        blockStyleFn={getBlockStyle}
        spellCheck
      />
    </div>
  );
};

export default RichTextEditor;
