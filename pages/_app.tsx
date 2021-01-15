import { AppProps } from 'next/app';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from 'store/reducers';
import '../styles/globals.scss';

const store = createStore(
  rootReducer, {},
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
