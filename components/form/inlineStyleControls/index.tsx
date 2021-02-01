import StyleButton from 'components/form/styleButton';
import { EditorState } from 'draft-js';

export const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

export interface InlineStyleControlsProps {
  editorState: EditorState,
  onToggle: (blockType: string) => void
}

const InlineStyleControls = ({ editorState, onToggle }: InlineStyleControlsProps): JSX.Element => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div>
      {INLINE_STYLES.map(({ label, style }) => (
        <StyleButton
          key={label}
          active={currentStyle.has(style)}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
