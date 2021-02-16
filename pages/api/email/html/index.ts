import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { getFullDate } from 'utils';
import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { templateHTML, generateSectionHTML, generateGroupsArray } from 'utils/email';
import { useDB } from 'utils/db';

import { Email, GenerateEmailData } from 'types/email';

const handler = createDefaultHandler()
  .use(useDB)

  .get(async (req, res) => {
    const { group, date } = req.query;
    const groupsArray = generateGroupsArray(group);

    const foundRelease = await releaseController.fetchReleaseByDate(Number(date as string) || Date.now());
    const releasePosts = await postController.fetchPostsForRelease(foundRelease);
    const filteredPosts = groupsArray.length ? releasePosts.filter((post) => post.recipientGroups.some((g) => groupsArray.includes(g))) : releasePosts;

    const generatedHTML: Email = templateHTML
      // Data replacement
      .replace(/{{__DATE}}/g, getFullDate())
      .replace(/{{__HEADERIMAGE}}/g, foundRelease.headerImage || 'DEFAULT_IMAGE_HERE')
      .replace(/{{__CAPTION}}/g, foundRelease.imageCaption)
      .replace(/{{__URL}}/g, __APP_URL__)

      // HTML replacement
      .replace(/{{__NEWS}}/g, generateSectionHTML(filteredPosts.filter((post) => post.type === 'news')))
      .replace(/{{__ANNOUNCEMENTS}}/g, generateSectionHTML(filteredPosts.filter((post) => post.type === 'announcement')))
      .replace(/{{__EVENTS}}/g, generateSectionHTML(filteredPosts.filter((post) => post.type === 'event')))

      // Tag replacement
      .replace(/<strong>/g, '<b>')
      .replace(/<\/strong>/g, '</b>')

      .replace(/<li>/g, '&bull; ')
      .replace(/<\/li>/g, '<br>')
      .replace(/<ul>/g, '')
      .replace(/<\/ul>/g, '')

      .replace(/<div>/g, '<table cellpadding="0" cellspacing="0" border="0"><tr><td>')
      .replace(/<\/div>/g, '</td></tr></table>');

    return res.status(200).json(createSuccessPayload<GenerateEmailData>({ html: generatedHTML }));
    // return res.status(200).send(generatedHTML);
  });

export default handler;
