import { createDefaultHandler, createSuccessPayload } from 'utils/api';

import { AuthUserData } from 'types/user';

const handler = createDefaultHandler<AuthUserData>({ requireAuth: false })
  .get((req, res) => {
    const isAuthenticated = !!req.session.casUser;
    const isStaff = req.session.info?.isStaff ?? false;
    const isReviewer = req.session.info?.isReviewer ?? false;

    const netId = req.session.info?.netId ?? null;
    const name = req.session.info?.name ?? '';

    return res.status(200).json(createSuccessPayload<AuthUserData>({
      isAuthenticated, isReviewer, isStaff, netId, name
    }));
  });

export default handler;
