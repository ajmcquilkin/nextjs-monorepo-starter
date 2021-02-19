import { createDefaultHandler, createSuccessPayload } from 'utils/api';

import { AuthUserData } from 'types/user';

const handler = createDefaultHandler<AuthUserData>()
  .get((req, res) => {
    const isAuthenticated = !!req.session.casUser;
    const { netId, isReviewer, isStaff } = req.session.info;

    return res.status(200).json(createSuccessPayload<AuthUserData>({
      isAuthenticated, isReviewer, isStaff, netId
    }));
  });

export default handler;
