import CASAuthentication, { CASInstance } from 'node-cas-authentication';
import { NextHandler } from 'next-connect';

import { BadCredentialsError, ForbiddenResourceError } from 'errors';
import { ServerRequestType, ServerResponseType, ServerSession } from 'types/server';

// TODO: DO NOT hard code these values
const APP_URL = 'localhost:3000';
const SELF_URL = 'localhost:3000';

const returnURL = `http://${APP_URL}/api/auth/user`;

// ! HARDCODED
const isDevMode = true;
const devModeUser: ServerSession['casUser'] = 'devModeUser';
const devModeInfo: ServerSession['info'] = {
  name: 'Phil Hanlon',
  netId: 'F000000'
};

// TODO: Implement dev mode with env
export const casInstance: CASInstance<ServerSession['info']> = new CASAuthentication<ServerSession['info']>({
  cas_url: 'https://login.dartmouth.edu/cas',
  service_url: `http://${SELF_URL}`,
  session_name: 'casUser',
  session_info: 'info',
  destroy_session: true,
  return_to: returnURL,

  is_dev_mode: isDevMode,
  dev_mode_user: devModeUser,
  dev_mode_info: devModeInfo
});

export const requireContributor = async (req: ServerRequestType, res: ServerResponseType, next: NextHandler): Promise<void> => {
  if (false) { throw new BadCredentialsError(); } // 401
  if (false) { throw new ForbiddenResourceError(); } // 403

  next();
};

export const requireReviewer = async (req: ServerRequestType, res: ServerResponseType, next: NextHandler): Promise<void> => {
  if (false) { throw new BadCredentialsError(); } // 401
  if (false) { throw new ForbiddenResourceError(); } // 403

  next();
};
