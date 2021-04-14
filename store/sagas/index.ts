import { all } from 'redux-saga/effects';
import resourceSaga from 'store/sagas/resourceSagas';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([
    resourceSaga()
  ]);
}
