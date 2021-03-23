import { ReactNode } from 'react';
import styles from './mainWrapper.module.scss';

interface MainWrapperProps {
  children: ReactNode
}

const MainWrapper = ({ children }: MainWrapperProps): JSX.Element => (
  <div className={styles.mainWrapperContainer}>
    <header>Header</header>

    <main
      aria-live="polite"
      aria-relevant="all"
    >
      {children}
    </main>

    <footer>Footer</footer>
  </div>
);

export default MainWrapper;
