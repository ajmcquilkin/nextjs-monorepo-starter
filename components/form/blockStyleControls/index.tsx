import { EditorState } from 'draft-js';
import StyleButton from 'components/form/styleButton';

export const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one' },
  // { label: 'H2', style: 'header-two' },
  // { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  { label: 'List', style: 'unordered-list-item' },
  // { label: 'OL', style: 'ordered-list-item' },
  // { label: 'Code Block', style: 'code-block' },
];

export interface BlockStyleControlsProps {
  editorState: EditorState,
  onToggle: (blockType: string) => void
}

const BlockStyleControls = ({ editorState, onToggle }: BlockStyleControlsProps): JSX.Element => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      {BLOCK_TYPES.map(({ label, style }) => (
        <StyleButton
          key={label}
          active={style === blockType}
          label={label}
          style={style}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
