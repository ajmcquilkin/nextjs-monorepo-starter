import CASAuthentication, { CASInstance } from 'node-cas-authentication';
import { NextHandler } from 'next-connect';

import { BadCredentialsError, ForbiddenResourceError } from 'errors';
import { ServerRequestType, ServerResponseType, ServerSession } from 'types/server';

const returnURL = `http://${__APP_URL__}/api/auth/user`;

const devModeUser: ServerSession['casUser'] = 'devModeUser';
const devModeInfo: ServerSession['info'] = {
  name: 'Phil Hanlon',
  isStaff: false,
  isReviewer: false,
  netId: 'F000000'
};

export const casInstance: CASInstance<ServerSession['info']> = new CASAuthentication<ServerSession['info']>({
  cas_url: 'https://login.dartmouth.edu/cas',
  service_url: __SERVICE_URL__,
  session_name: 'casUser',
  session_info: 'info',
  destroy_session: true,
  return_to: returnURL,

  is_dev_mode: true,
  dev_mode_user: devModeUser,
  dev_mode_info: devModeInfo

  // is_dev_mode: __MODE__ === 'dev',
  // dev_mode_user: __MODE__ === 'dev' ? devModeUser : undefined,
  // dev_mode_info: __MODE__ === 'dev' ? devModeInfo : undefined
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
