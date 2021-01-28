import * as releaseController from 'controllers/releaseController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';
import { useDB } from 'utils/db';

import { FetchReleaseData } from 'types/release';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  .post(async (req, res) => {
    const newRelease = await releaseController.create(req.body);
    return res.status(201).json(createSuccessPayload<FetchReleaseData>(newRelease));
  });

export default handler;
