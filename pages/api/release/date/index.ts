import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { DocumentNotFoundError } from 'errors';
import { casInstance } from 'utils/auth';
import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchReleaseData } from 'types/release';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  // fetches a release by date attribute
  .get(async (req, res) => {
    const date = req.query.date ? (Number(req.query.date)) : Date.now();

    const foundRelease = await releaseController.fetchReleaseByDate(date);
    if (!foundRelease) { throw new DocumentNotFoundError(date.toString()); }

    const foundPosts = await postController.fetchPostsForRelease(foundRelease);
    return res.status(200).json(createSuccessPayload<FetchReleaseData>({ release: foundRelease, posts: foundPosts }));
  });

export default handler;
