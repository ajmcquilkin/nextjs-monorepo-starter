import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';

import { validateUser as validateUserImport } from 'store/actionCreators/userActionCreators';
import { casInstance } from 'utils/auth';

import { ConnectedThunkCreator, RootState } from 'types/state';

export interface AuthWrapperPassedProps {
  children: ReactNode
}

export interface AuthWrapperStateProps {
  hasAttemptedAuth: boolean,
  isAuthenticated: boolean
}

export interface AuthWrapperDispatchProps {
  validateUser: ConnectedThunkCreator<typeof validateUserImport>
}

export type AuthWrapperProps = AuthWrapperPassedProps & AuthWrapperStateProps & AuthWrapperDispatchProps;

const AuthWrapper = ({
  children, hasAttemptedAuth, isAuthenticated, validateUser
}: AuthWrapperProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    validateUser({
      successCallback: (res) => {
        if (!res.data.data.isAuthenticated) { router.push(casInstance.getAuthenticationServerUrl()); }
      }
    });
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isAuthenticated ? children : (hasAttemptedAuth ? 'Authentication failed' : 'Authenticating')}
    </div>
  );
};

const mapStateToProps = (state: RootState): AuthWrapperStateProps => ({
  hasAttemptedAuth: state.user.hasAttemptedAuth,
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps: AuthWrapperDispatchProps = {
  validateUser: validateUserImport
};

const connector = connect<AuthWrapperStateProps, AuthWrapperDispatchProps, AuthWrapperPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(AuthWrapper);
