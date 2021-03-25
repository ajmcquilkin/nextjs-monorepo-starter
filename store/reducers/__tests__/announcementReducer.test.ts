import announcementReducer from 'store/reducers/announcementReducer';
import { AnnouncementState } from 'types/announcement';
import { Actions } from 'types/state';

describe('Announcement reducer', () => {
  const testState: AnnouncementState = { activeAnnouncement: 'test announcement' };

  test('rejects non-successful requests', () => {
    const testAction: Actions = {
      type: 'SET_ANNOUNCEMENT',
      status: 'FAILURE',
      payload: { data: { announcement: 'new announcement' } }
    };

    expect(announcementReducer(testState, testAction)).toEqual(testState);
  });

  test('handles SET_ANNOUNCEMENT type', () => {
    const testAction: Actions = {
      type: 'SET_ANNOUNCEMENT',
      status: 'SUCCESS',
      payload: { data: { announcement: 'new announcement' } }
    };

    expect(announcementReducer(testState, testAction)).toEqual({ activeAnnouncement: 'new announcement' });
  });

  test('handles CLEAR_ANNOUNCEMENT type', () => {
    const testAction: Actions = {
      type: 'CLEAR_ANNOUNCEMENT',
      status: 'SUCCESS',
      payload: { data: {} }
    };

    expect(announcementReducer(testState, testAction)).toEqual({ activeAnnouncement: '' });
  });
});
