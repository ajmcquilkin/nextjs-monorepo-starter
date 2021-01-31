export interface StyleButtonProps {
  label: string,
  style: string,
  active: boolean,
  onToggle: (style: string) => void
}

const StyleButton = ({ label, style, onToggle }: StyleButtonProps): JSX.Element => (
  <button type="button" onClick={() => onToggle(style)}>
    {label}
  </button>
);

export default StyleButton;
