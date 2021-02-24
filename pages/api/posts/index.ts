import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import {
  FetchPostData, FetchPostResultsData, FetchPostsData,
  PostStatus
} from 'types/post';
import { IncompleteRequestError } from 'errors';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const { status, date } = req.query;

    if (status && typeof status === 'string') {
      const posts = await postController.readAllByStatus(status as PostStatus);
      const results = posts.map((post) => post._id);
      const numResults = results.length;

      return res.status(200).json(createSuccessPayload<FetchPostResultsData>({ posts, results, numResults }));
    }

    if (date && typeof date === 'string') {
      const posts = await postController.readAllByDate(Number(date));
      const results = posts.map((post) => post._id);
      const numResults = results.length;

      return res.status(200).json(createSuccessPayload<FetchPostResultsData>({ posts, results, numResults }));
    }

    const foundPosts = await postController.readAll();
    return res.status(200).json(createSuccessPayload<FetchPostsData>({ posts: foundPosts }));
  })

  .post(async (req, res) => {
    const {
      type, requestedPublicationDate, submitterNetId, fromName, fromAddress,
      fullContent, briefContent, url, recipientGroups, featuredImage, eventDate, status = 'draft'
    } = req.body;

    if (!type) throw new IncompleteRequestError('type');
    if (!requestedPublicationDate) throw new IncompleteRequestError('requestedPublicationDate');
    if (!submitterNetId) throw new IncompleteRequestError('submitterNetId');

    const newPost = await postController.create({
      type,
      requestedPublicationDate,
      submitterNetId,
      fromName,
      fromAddress,
      fullContent,
      briefContent,
      url,
      recipientGroups,
      status,
      featuredImage,
      eventDate
    });

    return res.status(201).json(createSuccessPayload<FetchPostData>({ post: newPost }));
  });

export default handler;
