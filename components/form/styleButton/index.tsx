export interface StyleButtonProps {
  label: string,
  onToggle: () => void
}

const StyleButton = ({ label, onToggle }: StyleButtonProps): JSX.Element => (
  <button type="button" onClick={onToggle}>
    {label}
  </button>
);

export default StyleButton;
