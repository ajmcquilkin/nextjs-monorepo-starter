import '../styles/globals.scss';

interface AppProps {
  Component: JSX.Element,
  pageProps: any
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => <Component {...pageProps} />;

export default App;
