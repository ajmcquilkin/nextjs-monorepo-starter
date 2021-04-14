import { AppProps } from 'next/app';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import AnnouncementLiveText from 'components/helpers/announcementLiveText';
import MainWrapper from 'components/layout/mainWrapper';
import ModalWrapper from 'components/modals/modalWrapper';

import rootReducer from 'store/reducers';
import rootSaga from 'store/sagas';

import '../styles/globals.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, {},
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

Modal.setAppElement('#root');

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <div id="root">
    <Helmet>
      <title>NextJS Monorepo Starter</title>
      <meta name="description" content="A starter pack built in NextJS with Typescript intended for use in monorepo projects." />
      <link rel="shortcut icon" type="img/png" href="/favicon.png" />

      <meta name="og:title" content="NextJS Monorepo Starter" />
      {/* <meta name="og:image" content="/banner.png" /> */}
      <meta name="og:url" content={__APP_URL__} />
      <meta name="og:description" content="A starter pack built in NextJS with Typescript intended for use in monorepo projects." />
    </Helmet>

    <Provider store={store}>
      <AnnouncementLiveText />
      <MainWrapper>
        <ModalWrapper />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </MainWrapper>
    </Provider>
  </div>
);

export default App;
