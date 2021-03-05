import styles from './footer.module.scss';

const Footer = (): JSX.Element => (
  <footer className={styles.footerContainer}>
    <div className={styles.footerContentContainer}>
      <div className={styles.footerContent}>
        <p>Dartmouth College</p>
        <p>Hanover, NH 03755</p>
      </div>

      <div className={styles.footerContent}>
        <a href="mailto:vox@dartmouth.edu">vox@dartmouth.edu</a>
        <p>
          Copyright
          {' '}
          {(new Date()).getFullYear()}
        </p>
      </div>

      <div className={styles.footerContent}>
        <img src="/icons/dali.svg" alt="dali lab logo" />
      </div>
    </div>
  </footer>
);

export default Footer;
