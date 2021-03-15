import { connect } from 'react-redux';

import AnnouncementLiveText, { AnnouncementLiveTextProps } from 'components/helpers/announcementLiveText/announcementLiveText';

import { Empty } from 'types/generic';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): AnnouncementLiveTextProps => ({
  content: state.announcement.activeAnnouncement
});

const connector = connect<AnnouncementLiveTextProps, Empty, undefined>(mapStateToProps, {});

export default connector(AnnouncementLiveText);
