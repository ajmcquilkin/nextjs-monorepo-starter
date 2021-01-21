import styles from './footer.module.scss';

const Footer = (): JSX.Element => (
  <footer className={styles.footerContainer}>
    <div className={styles.footerContentContainer}>
      <div className={styles.footerContentLeft}>
        <p>Dartmouth College</p>
        <p>Hanover, NH 03755</p>
        <p>
          Copyright
          {' '}
          {(new Date()).getFullYear()}
        </p>
      </div>

      <div className={styles.footerContentRight}>
        <a href="mailto:vox@dartmouth.edu">vox@dartmouth.edu</a>
      </div>
    </div>
  </footer>
);

export default Footer;
