import { AppProps } from 'next/app';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import AnnouncementLiveText from 'components/helpers/announcementLiveText';
import AuthWrapper from 'components/helpers/authWrapper';
import MainWrapper from 'components/layout/mainWrapper';
import ModalWrapper from 'components/modals/modalWrapper';

import rootReducer from 'store/reducers';
import { siteMetaTitle } from 'utils';
import { useDefaultTimezone } from 'utils/time';

import { Actions, RootState } from 'types/state';

import '../styles/globals.scss';

// Reference: https://stackoverflow.com/questions/50294265/type-error-with-redux-thunk-when-using-connect
const store = createStore(
  rootReducer, {},
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootState, Actions>),
  )
);

useDefaultTimezone();

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <div id="root">
    <Helmet>
      <title>{siteMetaTitle}</title>
      <meta name="description" content="Your daily digest for what’s happening at Dartmouth and beyond." />
      <link rel="shortcut icon" type="img/png" href="/favicon.png" />

      <meta name="og:title" content={siteMetaTitle} />
      <meta name="og:image" content="/banner.png" />
      <meta name="og:url" content={__APP_URL__} />
      <meta name="og:description" content="Your daily digest for what’s happening at Dartmouth and beyond." />
    </Helmet>

    <Provider store={store}>
      <AnnouncementLiveText />
      <MainWrapper>
        <AuthWrapper>
          <ModalWrapper />
          <Component {...pageProps} />
        </AuthWrapper>
      </MainWrapper>
    </Provider>
  </div>
);

export default App;
