import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';

import { AuthUserData } from 'types/user';

const handler = createDefaultHandler<AuthUserData>()
  .use(casInstance.block)
  .get((req, res) => res.status(200).json(createSuccessPayload<AuthUserData>({
    isAuthenticated: !!req.session.info,
    isReviewer: !!req.session.info.isReviewer,
    isStaff: !!req.session.info.isStaff,
    netId: req.session.info.netId
  })));

export default handler;
