import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';

import AuthSwitch from 'components/hocs/authSwitch';

import { validateUser as validateUserImport } from 'store/actionCreators/userActionCreators';
import { casInstance } from 'utils/auth';

import { ConnectedThunkCreator, RootState } from 'types/state';
import LoadingScreen from 'components/layout/loadingScreen';

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
      renderLoading={() => (
        <LoadingScreen
          title="Authenticating..."
          subtitle="Please do not leave this page."
        />
      )}
      renderFailure={() => (
        <LoadingScreen
          title="Authentication Failure"
          subtitle="We couldn't verify your identity."
          linkText="Contact an Administrator"
          linkUrl="https://services.dartmouth.edu/TDClient/1806/Portal/Home/"
        />
      )}
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
