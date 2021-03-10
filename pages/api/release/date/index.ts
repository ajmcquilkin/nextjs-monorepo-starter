import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchReleaseData, PopulatedRelease } from 'types/release';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const date = req.query.date ? (Number(req.query.date)) : Date.now();

    const foundRelease = await releaseController.fetchReleaseByDate(date);
    // const foundPosts = await postController.fetchPostsForRelease(foundRelease);

    return res.status(200).json(createSuccessPayload<PopulatedRelease>(foundRelease));
  });

export default handler;
