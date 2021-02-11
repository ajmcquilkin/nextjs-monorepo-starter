/* eslint-disable max-len */

import { HTML } from 'types/email';
import { Post } from 'types/post';

// * Paste minified template HTML into this variable
export const templateHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Vox Daily - {{__DATE}}</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body style="margin: 0; padding: 0;"><table role="presentation" style="border: 1px solid darkgray; margin: 0 auto;" cellpadding="0" cellspacing="0" width="600px"><tr><td> <a style="display: inline-block; margin: 0; width: 100%; text-align: center;" href="{{__URL}}">View in browser</a></td></tr><tr><td><div style="height: 4px; border-radius: 2px; background-color: {{__DGREEN}};"></div></td></tr><tr><td><table style="margin: 0 auto;"><tr><td><h1 style="margin: 0; text-align: center;">Vox Daily</h1></td></tr><tr><td><h2 style="margin: 0; text-align: center;">{{__DATE}}</h2></td></tr></table></td></tr><tr><td><div style="height: 4px; border-radius: 2px; background-color: {{__DGREEN}};"></div></td></tr><tr><td><table style="margin: 0 auto; border: 1px solid darkgray; border-collapse: collapse;" cellpadding="0" cellspacing="0" width="300px"><tr><td> <img style="width: 100%;" src="{{__HEADERIMAGE}}" alt="daily header image" /><p style="margin: 0; text-align: center;">{{__CAPTION}}</p></td></tr></table></td></tr><tr><td><h3 style="margin: 0;">News</h3><div style="height: 2px; border-radius: 1px; background-color: {{__DGREEN}};"></div> {{__NEWS}}</td></tr><tr><td><h3 style="margin: 0;">Announcements</h3><div style="height: 2px; border-radius: 1px; background-color: {{__DGREEN}};"></div> {{__ANNOUNCEMENTS}}</td></tr><tr><td><h3 style="margin: 0;">Events</h3><div style="height: 2px; border-radius: 1px; background-color: {{__DGREEN}};"></div> {{__EVENTS}}</td></tr></table></body></html>';

export const generateGroupsArray = (group: string | string[]): string[] => {
  if (!group) return [];
  if (typeof group === 'string') return [group];
  return [...group];
};

export const generateSectionHTML = (posts: Post[]): HTML => (posts.length ? posts.map((post) => (
  `<div>
    <h4 style="{{__M0}}">${post.briefContent}</h4>
    <div>${post.fullContent}</div>
    <a style="{{__M0}}" href="${post.url}">${post.url}</a>
  </div>`
)).join('\n') : '<div>No content</div>');
