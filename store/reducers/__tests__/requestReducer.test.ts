import requestReducer from 'store/reducers/requestReducer';
import { Actions, RequestState } from 'types/state';

describe('Request reducer', () => {
  const testState: RequestState = {};

  test('rejects invalid actions', () => {
    const testAction = {
      type: 'TEST_TYPE',
      payload: { data: {} }
    };

    expect(requestReducer(testState, testAction as Actions)).toEqual(testState);
  });

  test('saves loading state', () => {
    const testAction = {
      type: 'TEST_TYPE',
      status: 'REQUEST',
      payload: { data: {} }
    };

    expect(requestReducer(testState, testAction as Actions)).toEqual({
      TEST_TYPE: {
        isLoading: true,
        message: '',
        code: null
      }
    });
  });

  test('updates loading state on failure', () => {
    const testAction = {
      type: 'TEST_TYPE',
      status: 'FAILURE',
      payload: { data: {}, message: 'Error', code: 600 }
    };

    expect(requestReducer(testState, testAction as Actions)).toEqual({
      TEST_TYPE: {
        isLoading: false,
        message: 'Error',
        code: 600
      }
    });
  });

  test('updates loading state on success', () => {
    const testAction = {
      type: 'TEST_TYPE',
      status: 'FAILURE',
      payload: { data: {}, message: '', code: 200 }
    };

    expect(requestReducer(testState, testAction as Actions)).toEqual({
      TEST_TYPE: {
        isLoading: false,
        message: '',
        code: 200
      }
    });
  });
});
