import CASAuthentication, { CASInstance } from 'node-cas-authentication';
import { NextHandler } from 'next-connect';

import { BadCredentialsError, ForbiddenResourceError, MissingConfigError } from 'errors';
import { ServerRequestType, ServerResponseType, ServerSession } from 'types/server';

if (!process.env.SERVICE_URL) throw new MissingConfigError('SERVICE_URL');
if (!process.env.APP_URL) throw new MissingConfigError('APP_URL');

const appUrl = process.env.APP_URL as string;
const serviceUrl = process.env.SERVICE_URL as string;

const returnURL = `http://${appUrl}/api/auth/user`;

const devModeUser: ServerSession['casUser'] = 'devModeUser';
const devModeInfo: ServerSession['info'] = {
  name: 'Phil Hanlon',
  netId: 'F000000'
};

export const casInstance: CASInstance<ServerSession['info']> = new CASAuthentication<ServerSession['info']>({
  cas_url: 'https://login.dartmouth.edu/cas',
  service_url: serviceUrl,
  session_name: 'casUser',
  session_info: 'info',
  destroy_session: true,
  return_to: returnURL,

  is_dev_mode: process.env.MODE === 'dev',
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
