import { connect } from 'react-redux';
import AuthSwitch, { AuthSwitchPassedProps, AuthSwitchStateProps, AuthSwitchDispatchProps } from 'components/hocs/authSwitch/authSwitch';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): AuthSwitchStateProps => ({
  hasAttemptedAuthentication: state.user.hasAttemptedAuth,
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps: AuthSwitchDispatchProps = {};

const connector = connect<AuthSwitchStateProps, AuthSwitchDispatchProps, AuthSwitchPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(AuthSwitch);
