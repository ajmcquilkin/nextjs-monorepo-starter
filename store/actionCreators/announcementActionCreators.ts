import { Announcement, AnnouncementActions } from 'types/announcement';

export const dispatchAnnouncement = (announcement: Announcement): AnnouncementActions => {
  if (__MODE__ === 'dev') { console.info(announcement); }

  return ({
    type: 'SET_ANNOUNCEMENT',
    payload: { announcement }
  });
};

export const clearAnnouncements = (): AnnouncementActions => ({
  type: 'CLEAR_ANNOUNCEMENT',
  payload: {}
});
