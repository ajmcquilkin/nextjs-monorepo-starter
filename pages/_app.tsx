import '../styles/globals.scss';

interface AppProps {
  Component: JSX.Element,
  pageProps: any
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
