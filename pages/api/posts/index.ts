import * as postController from 'controllers/postController';

import { BadCredentialsError, ForbiddenResourceError, IncompleteRequestError } from 'errors';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import {
  FetchPostData, FetchPostResultsData, FetchPostsData,
  PostStatus
} from 'types/post';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const { status, date } = req.query;
    const { info } = req.session;

    if (status && typeof status === 'string') {
      if (!info.isReviewer) throw new ForbiddenResourceError('Insufficient scopes for requesting posts from other users');

      const posts = await postController.readAllByStatus(status as PostStatus);
      const results = posts.map((post) => post._id);
      const numResults = results.length;

      return res.status(200).json(createSuccessPayload<FetchPostResultsData>({ posts, results, numResults }));
    }

    if (date && typeof date === 'string') {
      if (!info.isReviewer) throw new ForbiddenResourceError('Insufficient scopes for requesting posts from other users');

      const posts = await postController.readAllByDate(Number(date));
      const results = posts.map((post) => post._id);
      const numResults = results.length;

      return res.status(200).json(createSuccessPayload<FetchPostResultsData>({ posts, results, numResults }));
    }

    if (!info.netId) throw new BadCredentialsError('No valid netId included in request');
    const foundPosts = await postController.fetchPostsByNetId(info.netId);
    return res.status(200).json(createSuccessPayload<FetchPostsData>({ posts: foundPosts }));
  })

  .post(async (req, res) => {
    const { session: { info } } = req;
    if (!info.isStaff && !info.isReviewer) { throw new ForbiddenResourceError(); }

    const submitterNetId = info.netId;
    if (!submitterNetId) throw new Error('No session "netId" field found');

    const {
      type, requestedPublicationDate, fromName, fromAddress, fullContent, briefContent,
      url, recipientGroups, featuredImage, featuredImageAlt, eventDate, eventTime, status = 'draft'
    } = req.body;

    if (!info.isReviewer && type === 'news') throw new ForbiddenResourceError('Cannot create post of type "news" without reviewer permissions');
    if (status === 'approved') throw new ForbiddenResourceError('Cannot initialize post as "approved"');

    if (!type) throw new IncompleteRequestError('type');
    if (!requestedPublicationDate) throw new IncompleteRequestError('requestedPublicationDate');

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
      featuredImageAlt,
      eventDate,
      eventTime,
    });

    return res.status(201).json(createSuccessPayload<FetchPostData>({ post: newPost }));
  });

export default handler;
