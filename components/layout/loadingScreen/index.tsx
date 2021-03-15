import Link from 'next/link';
import styles from './loadingScreen.module.scss';

export interface LoadingScreenProps {
  title: string,
  subtitle: string,
  linkText?: string,
  linkUrl?: string
}

const LoadingScreen = ({
  title, subtitle, linkText = '', linkUrl = ''
}: LoadingScreenProps): JSX.Element => (
  <div className={styles.loadingScreenContainer}>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
    {linkText && linkUrl && (
      <Link href={linkUrl}>
        <a>{linkText}</a>
      </Link>
    )}

    <img src="/icons/lone-pine.svg" alt="Dartmouth lone pine" aria-hidden="true" />
  </div>
);

export default LoadingScreen;
