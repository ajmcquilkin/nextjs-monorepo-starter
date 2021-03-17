import Link from 'next/link';
import { Helmet } from 'react-helmet';
import { siteMetaTitle } from 'utils';
import styles from './notFoundFallback.module.scss';

const NotFoundFallback = (): JSX.Element => (
  <div>
    <Helmet>
      <title>{`404 - ${siteMetaTitle}`}</title>
    </Helmet>
    <div className={styles.notFoundFallbackContainer}>
      <h1>404: Page not Found</h1>
      <p>The page you&apos;re looking for no longer exists.</p>
      <Link href="/"><a>Home</a></Link>
    </div>
  </div>
);

export default NotFoundFallback;
