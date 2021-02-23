import { AppProps } from 'next/app';
import Modal from 'react-modal';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import AuthWrapper from 'components/helpers/authWrapper';
import MainWrapper from 'components/layout/mainWrapper';
import ModalWrapper from 'components/modals/modalWrapper';

import { openModal } from 'store/actionCreators/modalActionCreators';
import rootReducer from 'store/reducers';

import { Actions, RootState } from 'types/state';

import '../styles/globals.scss';

// Reference: https://stackoverflow.com/questions/50294265/type-error-with-redux-thunk-when-using-connect
const store = createStore(
  rootReducer, {},
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootState, Actions>),
  )
);

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');
store.dispatch(openModal('ERROR_MODAL', 'Test Error', 'I have lost my dog'));

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <div id="root">
    <Provider store={store}>
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
