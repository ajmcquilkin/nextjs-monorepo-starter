import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { siteMetaTitle } from 'utils';
import styles from './notFoundFallback.module.scss';

const NotFoundFallback = (): JSX.Element => (
  <div className={styles.notFoundFallbackContainer}>
    <Helmet>
      <title>{`404 - ${siteMetaTitle}`}</title>
    </Helmet>

    <h1>404: Page not Found</h1>
    <p>The page you&apos;re looking for no longer exists.</p>
    <Link href="/"><a>Home</a></Link>
  </div>
);

export default NotFoundFallback;
