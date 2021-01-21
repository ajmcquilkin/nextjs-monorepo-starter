import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';

import { ServerSession } from 'types/server';
import { AuthUserData } from 'types/user';

const handler = createDefaultHandler<AuthUserData>()
  .use(casInstance.block)
  .get((req, res) => {
    const isAuthenticated = !!req.session.casUser;

    let netId: ServerSession['info']['netId'];
    if (isAuthenticated && !req.session.info.netId) {
      netId = req.session.casUser;
    } else {
      netId = isAuthenticated ? req.session.info.netId : null;
    }

    // TODO: Change this static value to CAS scope-based auth
    const isReviewer = !!isAuthenticated;

    return res.status(200).json(createSuccessPayload<AuthUserData>({
      isAuthenticated, isReviewer, netId
    }));
  });

export default handler;
