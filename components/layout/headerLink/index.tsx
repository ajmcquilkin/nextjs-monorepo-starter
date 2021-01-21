import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import styles from './headerLink.module.scss';

export interface HeaderLinkProps {
  to: string,
  label: string,
  router: NextRouter,
}

const HeaderLink = ({ to, label, router }: HeaderLinkProps): JSX.Element => (
  <Link href={to}>
    <a className={[
      styles.headerLinkContainer,
      router.pathname === to
        ? styles.active
        : ''
    ].join(' ')}
    >
      {label}
    </a>
  </Link>
);

export default withRouter(HeaderLink);
