import { all } from 'redux-saga/effects';

import resourceSaga from 'store/sagas/resourceSagas';
import userSaga from 'store/sagas/userSagas';

export default function* rootSaga() {
  try {
    yield all([
      resourceSaga(),
      userSaga()
    ]);
  } catch (error) {
    console.error(error);
  }
}
