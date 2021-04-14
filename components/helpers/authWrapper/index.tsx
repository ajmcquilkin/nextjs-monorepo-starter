import { ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';

import AuthSwitch from 'components/hocs/authSwitch';

import { validateUser as validateUserImport } from 'store/actionCreators/userActionCreators';

import { RootState } from 'types/state';

export interface AuthWrapperPassedProps {
  children: ReactNode
}

export interface AuthWrapperStateProps {

}

export interface AuthWrapperDispatchProps {
  validateUser: typeof validateUserImport
}

export type AuthWrapperProps = AuthWrapperPassedProps & AuthWrapperStateProps & AuthWrapperDispatchProps;

const AuthWrapper = ({
  children, validateUser
}: AuthWrapperProps): JSX.Element => {
  useEffect(() => {
    validateUser();
  }, []);

  return (
    <AuthSwitch
      renderLoading={() => (
        <div>Loading...</div>
      )}
      renderFailure={() => (
        <div>Loading failed :\</div>
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
