import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { generateGroupsArray } from 'utils/email';
import { useDB } from 'utils/db';

import { CuratedGroupPostsData } from 'types/email';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const { group, date } = req.query;
    const groupsArray = generateGroupsArray(group);

    const foundRelease = await releaseController.fetchReleaseByDate(Number(date as string) || Date.now());
    const releasePosts = await postController.fetchPostsForRelease(foundRelease);
    const filteredPosts = groupsArray.length ? releasePosts.filter((post) => post.recipientGroups.some((g) => groupsArray.includes(g))) : releasePosts;

    return res.status(200).send(createSuccessPayload<CuratedGroupPostsData>({ release: foundRelease, posts: filteredPosts }));
  });

export default handler;
