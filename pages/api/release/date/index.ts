import * as releaseController from 'controllers/releaseController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import { PopulatedRelease } from 'types/release';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const date = req.query.date ? (Number(req.query.date)) : Date.now();
    const foundRelease = await releaseController.fetchReleaseByDate(date);
    return res.status(200).json(createSuccessPayload<PopulatedRelease>(foundRelease));
  });

export default handler;
