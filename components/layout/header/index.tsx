import Image from 'next/image';
import HeaderLink from 'components/layout/headerLink';
import styles from './header.module.scss';

interface HeaderProps {
  isAuthenticated?: boolean,
  isFaculty?: boolean,
  isReviewer?: boolean
}

const Header = ({ isAuthenticated = false, isFaculty = false, isReviewer = false }: HeaderProps): JSX.Element => (
  <header className={styles.headerContainer}>
    <div className={styles.headerBrandContainer}>
      <Image
        src="/dPineWhite.svg"
        alt="Vox Daily"
        width={40}
        height={40}
      />
      <h1>VOX DAILY</h1>
    </div>

    <nav className={styles.headerLinksContainer}>
      <HeaderLink to="/" label="Home" />
      {(isFaculty || isReviewer) && <HeaderLink to="/submissions" label="Submissions" />}
      {isReviewer && <HeaderLink to="/review" label="Review" />}
      {isReviewer && <HeaderLink to="/compile" label="Compile" />}
    </nav>

    <div className={styles.headerSignoutContainer}>
      {isAuthenticated
        ? <a href="/api/auth/logout">Log Out</a>
        : <a href="/api/auth/signin">Log in</a>}
    </div>
  </header>
);

export default Header;
