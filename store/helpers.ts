// eslint-disable-next-line import/prefer-default-export
export enum RequestStatus {
  request = 'request',
  success = 'success',
  failure = 'failure',
  clearError = 'clearError',
}

export const getReducerSuccessSelector = <T>(actionType: T): string => `${actionType}_${RequestStatus.success}`;
