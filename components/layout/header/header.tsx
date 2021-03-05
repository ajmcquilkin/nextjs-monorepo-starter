import AuthSwitch from 'components/hocs/authSwitch';
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
        src="/icons/dPineWhite.svg"
        alt="Vox Daily"
      />
      <p>VOX DAILY</p>
    </div>

    <nav className={styles.headerLinksContainer}>
      <AuthSwitch
        renderLoading={() => null}
        renderFailure={() => null}
      >
        <HeaderLink to="/" label="Home" />
        {(isStaff || isReviewer) && <HeaderLink to="/submissions" label="Submissions" />}
        {isReviewer && <HeaderLink to="/review" label="Review" />}
        {isReviewer && <HeaderLink to="/compile" label="Compile" />}
      </AuthSwitch>
    </nav>
  </header>
);

export default Header;
