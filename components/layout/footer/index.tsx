const Footer = (): JSX.Element => (
  <footer id="app-footer">
    <div id="app-footer-content-container">
      <div id="footer-content-left">
        <p>Dartmouth College</p>
        <p>Hanover, NH 03755</p>
        <p>
          Copyright
          {' '}
          {(new Date()).getFullYear()}
        </p>
      </div>
      <div id="footer-content-right"><a href="mailto:vox@dartmouth.edu">vox@dartmouth.edu</a></div>
    </div>
  </footer>
);

export default Footer;
