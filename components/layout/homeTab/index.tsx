export interface HomeTabProps {
  title: string,
  onClick: () => void
}

const HomeTab = ({ title, onClick }: HomeTabProps): JSX.Element => (
  <button type="button" onClick={onClick}>{title}</button>
);

export default HomeTab;
