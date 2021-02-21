import CASAuthentication from 'utils/cas';

import { ServerSession, ServerSessionInfo } from 'types/server';

const devModeUser: ServerSession['casUser'] = 'devModeUser';
const devModeInfo: ServerSessionInfo = {
  name: 'Phil Hanlon',
  affiliation: 'DART',
  netId: 'F000000',

  isReviewer: true,
  isStaff: true,

  uid: -1,
  attributes: {}
};

export const casInstance = new CASAuthentication({
  casServerUrl: 'https://login.dartmouth.edu/cas',
  serviceUrl: `${__APP_URL__}/api/auth/ticket`,
  sessionName: 'casUser',
  sessionInfoField: 'info',
  isDevMode: false,
  devModeInfo,
  devModeUser
});
