import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import ForbiddenResourceError from 'errors/ForbiddenResourceError';
import { BadCredentialsError } from 'errors';
import { Empty } from 'types/generic';

const handler = createDefaultHandler()
  .use(useDB)
  .use(requireUrlParam('date'))

  .patch(async (req, res) => {
    const { authorization = '' } = req.headers;

    if (!__EMAIL_API_KEY__) throw new Error('No valid internal API key found');
    if (!authorization) throw new ForbiddenResourceError();
    if (authorization !== __EMAIL_API_KEY__) throw new BadCredentialsError();

    const { date } = req.query;
    const { release: foundRelease } = await releaseController.fetchReleaseByDate(Number(date as string));

    const postsToUpdate = [...foundRelease.news, ...foundRelease.announcements, ...foundRelease.events];
    if (foundRelease.featuredPost) postsToUpdate.push(foundRelease.featuredPost);

    await postController.updateMany({ _id: { $in: postsToUpdate } }, { status: 'published' });

    return res.status(200).json(createSuccessPayload<Empty>({}));
  });

export default handler;
