import { AnnouncementState } from 'types/announcement';
import { Actions } from 'types/state';

const initialState: AnnouncementState = {
  activeAnnouncement: ''
};

const announcementReducer = (state = initialState, action: Actions): AnnouncementState => {
  if (action.status !== 'SUCCESS') { return state; }

  switch (action.type) {
    case 'SET_ANNOUNCEMENT':
      return { ...state, activeAnnouncement: action.payload.data.announcement };

    case 'CLEAR_ANNOUNCEMENT':
      return { ...state, activeAnnouncement: '' };

    default:
      return state;
  }
};

export default announcementReducer;
