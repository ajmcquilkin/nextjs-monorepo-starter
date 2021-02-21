import HeaderLink from 'components/layout/headerLink';
import styles from './header.module.scss';

export interface HeaderPassedProps {

}

export interface HeaderStateProps {
  isStaff: boolean,
  isReviewer: boolean
}

export interface HeaderDispatchProps {

}

export type HeaderProps = HeaderPassedProps & HeaderStateProps & HeaderDispatchProps;

const Header = ({ isStaff, isReviewer }: HeaderProps): JSX.Element => (
  <header className={styles.headerContainer}>
    <div className={styles.headerBrandContainer}>
      <img
        src="/dPineWhite.svg"
        alt="Vox Daily"
        width={40}
        height={40}
      />
      <h1>VOX DAILY</h1>
    </div>

    <nav className={styles.headerLinksContainer}>
      <HeaderLink to="/" label="Home" />
      {(isStaff || isReviewer) && <HeaderLink to="/submissions" label="Submissions" />}
      {isReviewer && <HeaderLink to="/review" label="Review" />}
      {isReviewer && <HeaderLink to="/compile" label="Compile" />}
    </nav>
  </header>
);

export default Header;
