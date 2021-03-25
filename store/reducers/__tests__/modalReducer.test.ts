import modalReducer from 'store/reducers/modalReducer';
import { ModalState } from 'types/modal';
import { Actions } from 'types/state';

describe('Announcement reducer', () => {
  const testState: ModalState = {
    type: null,
    title: '',
    content: ''
  };

  test('rejects non-successful requests', () => {
    const testAction: Actions = {
      type: 'CLOSE_MODAL',
      status: 'FAILURE',
      payload: { data: {} }
    };

    expect(modalReducer(testState, testAction)).toEqual(testState);
  });

  test('handles OPEN_MODAL type', () => {
    const testAction: Actions = {
      type: 'OPEN_MODAL',
      status: 'SUCCESS',
      payload: {
        data: {
          type: 'SAMPLE_MODAL',
          config: { title: 'Test title', content: 'Test content' }
        }
      }
    };

    expect(modalReducer(testState, testAction)).toEqual({ type: 'SAMPLE_MODAL', title: 'Test title', content: 'Test content' });
  });

  test('handles CLOSE_MODAL type', () => {
    const testAction: Actions = {
      type: 'CLOSE_MODAL',
      status: 'SUCCESS',
      payload: { data: {} }
    };

    expect(modalReducer(testState, testAction)).toEqual({ type: null, title: '', content: '' });
  });
});
