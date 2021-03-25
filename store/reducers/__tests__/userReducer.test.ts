import userReducer from 'store/reducers/userReducer';
import { UserState } from 'types/user';
import { Actions } from 'types/state';

describe('User reducer', () => {
  const testState: UserState = {
    name: '',
    netId: null,

    hasAttemptedAuth: false,
    isAuthenticated: false,
    isStaff: false,
    isReviewer: false
  };

  test('rejects non-successful requests', () => {
    const testAction = {
      type: 'AUTH_USER',
      status: 'FAILURE',
      payload: { data: {} }
    };

    expect(userReducer(testState, testAction as Actions)).toEqual(testState);
  });

  test('handles AUTH_USER type', () => {
    const testAction: Actions = {
      type: 'AUTH_USER',
      status: 'SUCCESS',
      payload: {
        data: {
          name: 'Name',
          netId: 'F000000',
          isAuthenticated: true,
          isStaff: false,
          isReviewer: false
        }
      }
    };

    expect(userReducer(testState, testAction)).toEqual({
      name: 'Name',
      netId: 'F000000',
      hasAttemptedAuth: true,
      isAuthenticated: true,
      isStaff: false,
      isReviewer: false
    });
  });

  test('handles DEAUTH_USER type', () => {
    const testAction: Actions = {
      type: 'DEAUTH_USER',
      status: 'SUCCESS',
      payload: { data: {} }
    };

    expect(userReducer(testState, testAction)).toEqual({
      name: '',
      netId: null,
      hasAttemptedAuth: false,
      isAuthenticated: false,
      isStaff: false,
      isReviewer: false
    });
  });
});
