import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchReleaseData } from 'types/release';
import ForbiddenResourceError from 'errors/ForbiddenResourceError';
import { IncompleteRequestError } from 'errors';

const handler = createDefaultHandler()
  .use(useDB)

  .post(async (req, res) => {
    const { session: { info } } = req;
    if (!info.isReviewer) { throw new ForbiddenResourceError(); }

    const {
      subject, headerImage, quoteOfDay, quotedContext, featuredPost, date, news, announcements, events
    } = req.body;

    if (!date) throw new IncompleteRequestError('date');

    const newRelease = await releaseController.create({
      subject, headerImage, quoteOfDay, quotedContext, featuredPost, date, news, announcements, events
    });

    const foundPosts = await postController.fetchPostsForRelease(newRelease);
    return res.status(201).json(createSuccessPayload<FetchReleaseData>({ release: newRelease, posts: foundPosts }));
  });

export default handler;
