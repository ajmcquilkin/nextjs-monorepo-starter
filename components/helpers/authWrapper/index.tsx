import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';

import AuthSwitch from 'components/hocs/authSwitch';

import { validateUser as validateUserImport } from 'store/actionCreators/userActionCreators';
import { casInstance } from 'utils/auth';

import { ConnectedThunkCreator, RootState } from 'types/state';

export interface AuthWrapperPassedProps {
  children: ReactNode
}

export interface AuthWrapperStateProps {

}

export interface AuthWrapperDispatchProps {
  validateUser: ConnectedThunkCreator<typeof validateUserImport>
}

export type AuthWrapperProps = AuthWrapperPassedProps & AuthWrapperStateProps & AuthWrapperDispatchProps;

const AuthWrapper = ({
  children, validateUser
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
    <AuthSwitch
      renderLoading={() => 'Authenticating...'}
      renderFailure={() => 'Authentication Failure'}
    >
      {children}
    </AuthSwitch>
  );
};

const mapStateToProps = (state: RootState): AuthWrapperStateProps => ({

});

const mapDispatchToProps: AuthWrapperDispatchProps = {
  validateUser: validateUserImport
};

const connector = connect<AuthWrapperStateProps, AuthWrapperDispatchProps, AuthWrapperPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(AuthWrapper);
