import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

import styles from './mainWrapper.module.scss';

interface MainWrapperProps {
  children: JSX.Element
}

const MainWrapper = ({ children }: MainWrapperProps): JSX.Element => (
  <div className={styles.mainWrapperContainer}>
    <Header />

    <main>
      {children}
    </main>

    <div className={styles.footerPositionContainer}>
      <Footer />
    </div>
  </div>
);

export default MainWrapper;
