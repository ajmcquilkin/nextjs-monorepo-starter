import { ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';
import { validateUser as validateUserImport } from 'store/actionCreators/userActionCreators';

import { ConnectedThunkCreator, RootState } from 'types/state';

export interface AuthWrapperPassedProps {
  children: ReactNode
}

export interface AuthWrapperStateProps {
  isAuthenticated: boolean
}

export interface AuthWrapperDispatchProps {
  validateUser: ConnectedThunkCreator<typeof validateUserImport>
}

export type AuthWrapperProps = AuthWrapperPassedProps & AuthWrapperStateProps & AuthWrapperDispatchProps;

const AuthWrapper = ({ children, isAuthenticated, validateUser }: AuthWrapperProps): JSX.Element => {
  useEffect(() => {
    validateUser({
      successCallback: (res) => {
        if (!res.data.data.isAuthenticated) { window.location.href = `https://login.dartmouth.edu/cas?service=${encodeURIComponent(__SERVICE_URL__)}&method=POST`; }
      }
    });
  });

  return (
    <div>
      {isAuthenticated ? children : 'Authenticating'}
    </div>
  );
};
const mapStateToProps = (state: RootState): AuthWrapperStateProps => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps: AuthWrapperDispatchProps = {
  validateUser: validateUserImport
};

const connector = connect<AuthWrapperStateProps, AuthWrapperDispatchProps, AuthWrapperPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(AuthWrapper);
