import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';
import { useDB } from 'utils/db';

import { FetchReleaseData } from 'types/release';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  .post(async (req, res) => {
    const newRelease = await releaseController.create(req.body);
    const foundPosts = await postController.fetchPostsForRelease(newRelease);
    return res.status(201).json(createSuccessPayload<FetchReleaseData>({ release: newRelease, posts: foundPosts }));
  });

export default handler;
