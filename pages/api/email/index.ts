import * as releaseController from 'controllers/releaseController';

import { BadCredentialsError, ForbiddenResourceError } from 'errors';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { generateGroupsArray } from 'utils/email';
import { useDB } from 'utils/db';

import { CuratedGroupPostsData } from 'types/email';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const { authorization = '' } = req.headers;

    if (!__EMAIL_API_KEY__) throw new Error('No valid internal API key found');
    if (!authorization) throw new ForbiddenResourceError();
    if (authorization !== __EMAIL_API_KEY__) throw new BadCredentialsError();

    const { group, date } = req.query;
    const groupsArray = generateGroupsArray(group);

    const { release, posts } = await releaseController.fetchReleaseByDate(Number(date as string) || Date.now());
    const filteredPosts = groupsArray.length ? posts.filter((post) => post.recipientGroups.some((g) => groupsArray.includes(g))) : posts;

    return res.status(200).send(createSuccessPayload<CuratedGroupPostsData>({ release, posts: filteredPosts }));
  });

export default handler;
