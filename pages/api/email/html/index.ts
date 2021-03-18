/* eslint-disable max-len */

import * as releaseController from 'controllers/releaseController';

import { BadCredentialsError, ForbiddenResourceError } from 'errors';

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
    const { authorization = '' } = req.headers;

    if (__MODE__ !== 'dev') {
      if (!__EMAIL_API_KEY__) throw new Error('No valid internal API key found');
      if (!authorization) throw new ForbiddenResourceError();
      if (authorization !== __EMAIL_API_KEY__) throw new BadCredentialsError();
    }

    const { group, date } = req.query;
    const groupsArray = generateGroupsArray(group);

    const { release, posts } = await releaseController.fetchReleaseByDate(Number(date as string) || Date.now());
    const filteredPosts = groupsArray.length ? posts.filter((post) => post.recipientGroups.some((g) => groupsArray.includes(g))) : posts;

    const generatedHTML: Email = templateHTML
      // Data replacement
      .replace(/{{__DATE}}/g, getFullDate())
      .replace(/{{__CAPTION}}/g, release.quoteOfDay)
      .replace(/{{__CAPTIONCONTEXT}}/g, release.quotedContext)
      .replace(/{{__URL}}/g, __APP_URL__)

      // HTML replacement
      .replace(/{{__NEWSTITLES}}/g, generateTitleSectionHTML(filteredPosts
        .filter((post) => post.type === 'news')
        .reduce((accum, { briefContent, url }) => ([...accum, { title: briefContent, link: url || __APP_URL__ }]), [])))

      .replace(/{{__ANNOUNCEMENTSTITLES}}/g, generateTitleSectionHTML(filteredPosts
        .filter((post) => post.type === 'announcement')
        .reduce((accum, { briefContent, url }) => ([...accum, { title: briefContent, link: url || __APP_URL__ }]), [])))

      .replace(/{{__EVENTSTITLES}}/g, generateTitleSectionHTML(filteredPosts
        .filter((post) => post.type === 'event')
        .reduce((accum, { briefContent, url, fromName }) => ([...accum, { title: briefContent, link: url || __APP_URL__, extra: fromName }]), [])))

      .replace(/{{__NEWS}}/g, generateContentSectionHTML(filteredPosts.filter((post) => post.type === 'news')))
      .replace(/{{__ANNOUNCEMENTS}}/g, generateContentSectionHTML(filteredPosts.filter((post) => post.type === 'announcement')))
      .replace(/{{__EVENTS}}/g, generateContentSectionHTML(filteredPosts.filter((post) => post.type === 'event')))

      .replace(/{{__COPYRIGHT}}/g, (new Date()).getFullYear().toString())

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
