import { connect } from 'react-redux';

import Home, { HomePassedProps, HomeStateProps, HomeDispatchProps } from 'components/pages/home';

import { dispatchAnnouncement } from 'store/actionCreators/announcementActionCreators';
import { openModal } from 'store/actionCreators/modalActionCreators';
import { fetchReleaseByDate } from 'store/actionCreators/releaseActionCreators';
import { createLoadingSelector } from 'store/actionCreators/requestActionCreators';

import { RootState } from 'types/state';

const releaseLoadingSelector = createLoadingSelector(['FETCH_RELEASE']);

const mapStateToProps = (state: RootState): HomeStateProps => ({
  release: state.release.release,
  postMap: state.post.posts,
  releaseIsLoading: releaseLoadingSelector(state)
});

const mapDispatchToProps: HomeDispatchProps = {
  dispatchAnnouncement,
  openModal,
  fetchReleaseByDate
};

const connector = connect<HomeStateProps, HomeDispatchProps, HomePassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Home);
