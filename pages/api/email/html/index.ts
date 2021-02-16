/* eslint-disable max-len */

import * as releaseController from 'controllers/releaseController';
import * as postController from 'controllers/postController';

import { getFullDate } from 'utils';
import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import {
  templateHTML, generateGroupsArray,
  generateTitleSectionHTML, generateContentSectionHTML
} from 'utils/email';
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
      .replace(/{{__HEADERIMAGE}}/g, foundRelease.headerImage || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thoughtco.com%2Fthmb%2Fbc9Klx19dMQgfRh2I5xT0qorJ_w%3D%2F1500x1000%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2FDartmouthCollegeNH-58b46ae15f9b586046288090.jpg&f=1&nofb=1')
      .replace(/{{__CAPTION}}/g, foundRelease.imageCaption)
      .replace(/{{__URL}}/g, __APP_URL__)

      // HTML replacement
      .replace(/{{__NEWSTITLES}}/g, generateTitleSectionHTML(filteredPosts
        .filter((post) => post.type === 'news')
        .reduce((accum, { briefContent, url }) => ([...accum, { title: briefContent, link: url }]), [])))

      .replace(/{{__ANNOUNCEMENTSTITLES}}/g, generateTitleSectionHTML(filteredPosts
        .filter((post) => post.type === 'announcement')
        .reduce((accum, { briefContent, url }) => ([...accum, { title: briefContent, link: url }]), [])))

      .replace(/{{__EVENTSTITLES}}/g, generateTitleSectionHTML(filteredPosts
        .filter((post) => post.type === 'event')
        .reduce((accum, { briefContent, url, fromName }) => ([...accum, { title: briefContent, link: url, extra: fromName }]), [])))

      .replace(/{{__NEWS}}/g, generateContentSectionHTML(filteredPosts.filter((post) => post.type === 'news')))
      .replace(/{{__ANNOUNCEMENTS}}/g, generateContentSectionHTML(filteredPosts.filter((post) => post.type === 'announcement')))
      .replace(/{{__EVENTS}}/g, generateContentSectionHTML(filteredPosts.filter((post) => post.type === 'event')))

      // Tag replacement
      .replace(/<strong>/g, '<b>')
      .replace(/<\/strong>/g, '</b>')

      .replace(/<li>/g, '&bull; ')
      .replace(/<\/li>/g, '<br>')
      .replace(/<ul>/g, '')
      .replace(/<\/ul>/g, '')

      .replace(/<div>/g, '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td>')
      .replace(/<\/div>/g, '</td></tr></table>');

    return res.status(200).json(createSuccessPayload<GenerateEmailData>({ html: generatedHTML }));
    // return res.status(200).send(generatedHTML);
  });

export default handler;
