/* eslint-disable max-len */

import { HTML } from 'types/email';
import { Post } from 'types/post';

// * Paste minified template HTML into this variable
export const templateHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Vox Daily - {{__DATE}}</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style>*{font-family:Arial,Helvetica,sans-serif}.spacer{padding:2px 0 2px 0}.sectionSpacerPadding{padding:0 0 24px 0}p{margin:0 0 0 0}h1{font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:40px;font-weight:900}h2{font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:21px;font-weight:900}h3{margin:0 0 8px 0;text-transform:uppercase;font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:21px;font-weight:500}h4{font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:18px;font-weight:600}.sectionPadding{padding:0 0 36px 0;margin:0 0 0 0}table{border-collapse:separate}a,a:link,a:visited{text-decoration:none;color:#267ABA}a:hover{text-decoration:underline}.ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td{line-height:100%}.ExternalClass{width:100%}</style></head><body style="margin: 0; padding: 0;"><table role="presentation" style="margin: 0 auto 0 auto; padding: 0 36px 36px 36px;" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><p style="padding: 21px 0 21px 0; text-align: center;"> <a style="color: #00693E; margin: 0; text-align: center;" href="{{__URL}}"> View in browser </a></p></td></tr><tr><td class="spacer" bgcolor="#00693E"></td></tr><tr><td><table style="margin: 0 auto;" cellpadding="0" cellspacing="0" border="0"><tr><td><h1 style="margin: 12px 0 3px; text-align: center;">Vox Daily</h1></td></tr><tr><td><h2 style="margin: 0 0 12px; text-align: center;">{{__DATE}}</h2></td></tr></table></td></tr><tr><td class="spacer" bgcolor="#00693E"></td></tr><tr><td><table style="padding: 36px 0 36px 0; margin: 0 auto 0 auto;" width="300" cellpadding="0" cellspacing="0" border="0"><tr><td> <img style="padding: 0 0 12px 0;" src="{{__HEADERIMAGE}}" alt="daily header image" width="100%" /><p style="margin: 0; text-align: center;">{{__CAPTION}}</p></td></tr></table></td></tr><tr><td><h3>News</h3><table class="sectionSpacerPadding" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="spacer" bgcolor="#00693E"></td></tr></table> {{__NEWS}}<p class="sectionPadding"></p></td></tr><tr><td><h3>Announcements</h3><table class="sectionSpacerPadding" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="spacer" bgcolor="#00693E"></td></tr></table> {{__ANNOUNCEMENTS}}<p class="sectionPadding"></p></td></tr><tr><td><h3>Events</h3><table class="sectionSpacerPadding" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="spacer" bgcolor="#00693E"></td></tr></table> {{__EVENTS}}</td></tr></table></body></html>';

export const generateGroupsArray = (group: string | string[]): string[] => {
  if (!group) return [];
  if (typeof group === 'string') return [group];
  return [...group];
};

export const generateSectionHTML = (posts: Post[]): HTML => (posts.length ? posts.map((post) => (
  `<table cellpadding="0" cellspacing="0" border="0"><tr><td>
    <h4 style="margin: 0 0 0 0; padding: 0 0 9px 0;">${post.briefContent}</h4>
    <table style="margin: 0 0 12px 0"><tr><td>${post.fullContent}</td></tr></table>
    <a style="margin: 6px 0 0 0;" href="${post.url}">${post.url}</a>
  </td></tr></table>`
)).join('\n') : '<div>No content</div>');
