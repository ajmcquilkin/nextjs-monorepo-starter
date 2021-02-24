import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchReleaseData, Release, DeleteReleaseData } from 'types/release';
import ForbiddenResourceError from 'errors/ForbiddenResourceError';

const handler = createDefaultHandler()
  .use(useDB)
  .use(requireUrlParam('id'))

  .get(async (req, res) => {
    const { id } = req.query;

    const foundRelease = await releaseController.read(id as string);
    const foundPosts = await postController.fetchPostsForRelease(foundRelease);

    return res.status(200).json(createSuccessPayload<FetchReleaseData>({ release: foundRelease, posts: foundPosts }));
  })

  .put(async (req, res) => {
    const { session: { info } } = req;
    if (!info.isReviewer) { throw new ForbiddenResourceError(); }

    const { id } = req.query;
    const {
      date, subject, headerImage, imageCaption, quoteOfDay, quotedContext, featuredPost, news, announcements, events
    }: Partial<Release> = req.body;

    const updatedRelease = await releaseController.update(id as string, {
      date,
      subject,
      headerImage,
      imageCaption,
      quoteOfDay,
      quotedContext,
      featuredPost,
      news,
      announcements,
      events
    });

    const foundPosts = await postController.fetchPostsForRelease(updatedRelease);
    return res.status(200).json(createSuccessPayload<FetchReleaseData>({ release: updatedRelease, posts: foundPosts }));
  })

  .delete(async (req, res) => {
    const { session: { info } } = req;
    if (!info.isReviewer) { throw new ForbiddenResourceError(); }

    const { id } = req.query;
    await releaseController.remove(id as string);
    return res.status(200).json(createSuccessPayload<DeleteReleaseData>({ id: id as string }));
  });

export default handler;
