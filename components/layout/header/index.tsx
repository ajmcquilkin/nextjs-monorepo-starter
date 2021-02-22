import { connect } from 'react-redux';
import Header, { HeaderPassedProps, HeaderDispatchProps, HeaderStateProps } from 'components/layout/header/header';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): HeaderStateProps => ({
  isStaff: state.user.isStaff,
  isReviewer: state.user.isReviewer
});

const connector = connect<HeaderStateProps, HeaderDispatchProps, HeaderPassedProps>(mapStateToProps, {});

export default connector(Header);
