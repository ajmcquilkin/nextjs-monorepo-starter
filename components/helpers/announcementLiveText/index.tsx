import { connect } from 'react-redux';
import AnnouncementLiveText, { AnnouncementLiveTextStateProps, AnnouncementLiveTextDispatchProps, AnnouncementLiveTextPassedProps } from 'components/helpers/announcementLiveText/announcementLiveText';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): AnnouncementLiveTextStateProps => ({
  content: state.announcement.activeAnnouncement
});

const connector = connect<AnnouncementLiveTextStateProps, AnnouncementLiveTextDispatchProps, AnnouncementLiveTextPassedProps>(mapStateToProps, {});

export default connector(AnnouncementLiveText);
