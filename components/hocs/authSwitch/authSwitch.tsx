import { ReactNode } from 'react';

export interface AuthSwitchPassedProps {
  children: ReactNode,
  renderLoading: (children: ReactNode) => ReactNode,
  renderFailure: (children: ReactNode) => ReactNode
}

export interface AuthSwitchStateProps {
  hasAttemptedAuthentication: boolean,
  isAuthenticated: boolean
}

export interface AuthSwitchDispatchProps {

}

export type AuthSwitchProps = AuthSwitchPassedProps & AuthSwitchStateProps & AuthSwitchDispatchProps;

const AuthSwitch = ({
  hasAttemptedAuthentication, isAuthenticated,
  children, renderLoading, renderFailure
}: AuthSwitchProps): JSX.Element => {
  if (isAuthenticated) return <>{children}</>;
  if (hasAttemptedAuthentication) return <>{renderFailure(children)}</>;
  return <>{renderLoading(children)}</>;
};

export default AuthSwitch;
