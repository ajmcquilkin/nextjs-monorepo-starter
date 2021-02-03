import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';
import { useDB } from 'utils/db';

import {
  FetchPostData, FetchPostResultsData, FetchPostsData,
  PostStatus
} from 'types/post';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  .get(async (req, res) => {
    const { status } = req.query;

    if (status && typeof status === 'string') {
      const posts = await postController.readAllByStatus(status as PostStatus);
      const results = posts.map((post) => post._id);
      const numResults = results.length;

      return res.status(200).json(createSuccessPayload<FetchPostResultsData>({ posts, results, numResults }));
    }

    const foundPosts = await postController.readAll();
    return res.status(200).json(createSuccessPayload<FetchPostsData>({ posts: foundPosts }));
  })

  .post(async (req, res) => {
    const newPost = await postController.create(req.body);
    return res.status(201).json(createSuccessPayload<FetchPostData>({ post: newPost }));
  });

export default handler;
