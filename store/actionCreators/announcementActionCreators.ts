import { Announcement } from 'types/announcement';
import { ThunkResult } from 'types/state';

export const dispatchAnnouncement = (announcement: Announcement): ThunkResult => (dispatch): void => {
  dispatch({
    type: 'SET_ANNOUNCEMENT',
    payload: { data: { announcement } },
    status: 'SUCCESS'
  });
};

export const clearAnnouncements = (): ThunkResult => (dispatch): void => {
  dispatch({
    type: 'CLEAR_ANNOUNCEMENT',
    payload: { data: {} },
    status: 'SUCCESS'
  });
};
