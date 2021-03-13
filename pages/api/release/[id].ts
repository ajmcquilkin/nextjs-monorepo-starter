import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import {
  FetchReleaseData, Release, DeleteReleaseData, PopulatedRelease
} from 'types/release';
import ForbiddenResourceError from 'errors/ForbiddenResourceError';

const handler = createDefaultHandler()
  .use(useDB)
  .use(requireUrlParam('id'))

  .get(async (req, res) => {
    const { id } = req.query;
    const populatedRelease = await releaseController.read(id as string);
    return res.status(200).json(createSuccessPayload<PopulatedRelease>(populatedRelease));
  })

  .put(async (req, res) => {
    const { session: { info } } = req;
    if (!info.isReviewer) { throw new ForbiddenResourceError(); }

    const { id } = req.query;
    const {
      date, subject, headerImage, headerImageCaption, headerImageAlt,
      quoteOfDay, quotedContext, featuredPost,
      news, announcements, events
    }: Partial<Release> = req.body;

    const updatedRelease = await releaseController.update(id as string, {
      date,

      subject,
      headerImage,
      headerImageCaption,
      headerImageAlt,

      quoteOfDay,
      quotedContext,
      featuredPost,

      news,
      announcements,
      events,

      lastEdited: Date.now()
    });

    // const foundPosts = await postController.fetchPostsForRelease(updatedRelease);
    return res.status(200).json(createSuccessPayload<PopulatedRelease>(updatedRelease));
  })

  .delete(async (req, res) => {
    const { session: { info } } = req;
    if (!info.isReviewer) { throw new ForbiddenResourceError(); }

    const { id } = req.query;
    await releaseController.remove(id as string);
    return res.status(200).json(createSuccessPayload<DeleteReleaseData>({ id: id as string }));
  });

export default handler;
