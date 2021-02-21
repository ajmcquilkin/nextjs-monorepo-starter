import { AppProps } from 'next/app';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import AuthWrapper from 'components/helpers/authWrapper';
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

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Provider store={store}>
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  </Provider>
);

export default App;
