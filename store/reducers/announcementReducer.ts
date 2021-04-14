import { AnnouncementState } from 'types/announcement';
import { Actions } from 'types/state';

const initialState: AnnouncementState = {
  activeAnnouncement: ''
};

const announcementReducer = (state = initialState, action: Actions): AnnouncementState => {
  switch (action.type) {
    case 'SET_ANNOUNCEMENT':
      return { ...state, activeAnnouncement: action.payload.announcement };

    case 'CLEAR_ANNOUNCEMENT':
      return { ...state, activeAnnouncement: initialState.activeAnnouncement };

    default:
      return state;
  }
};

export default announcementReducer;
