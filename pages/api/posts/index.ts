import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';
import { useDB } from 'utils/db';

import { FetchPostData, FetchPostsData } from 'types/post';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  .get(async (_req, res) => {
    const foundPosts = await postController.readAll();
    return res.status(200).json(createSuccessPayload<FetchPostsData>({ posts: foundPosts }));
  })

  .post(async (req, res) => {
    const newPost = await postController.create(req.body);
    return res.status(201).json(createSuccessPayload<FetchPostData>({ post: newPost }));
  });

export default handler;
