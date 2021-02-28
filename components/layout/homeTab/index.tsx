import styles from './homeTab.module.scss';

export interface HomeTabProps {
  title: string,
  active: boolean,
  onClick: () => void,

  className?: string
}

const HomeTab = ({
  title, active, onClick, className = ''
}: HomeTabProps): JSX.Element => (
  <div className={[styles.homeTabContainer, className].join(' ')}>
    <button className={active ? styles.active : ''} type="button" onClick={onClick}>{title}</button>
  </div>
);

export default HomeTab;
