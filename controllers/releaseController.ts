import { DocumentNotFoundError } from 'errors';
import { ReleaseModel } from 'models';

import { Release, ReleaseDocument } from 'types/release';

type CreateReleaseType = Pick<Release,
    'date' | 'subject' | 'headerImage' | 'quoteOfDay' | 'quotedContext' | 'featuredPost' | 'news' | 'announcements' | 'events'
>;

export const create = async (fields: CreateReleaseType): Promise<Release> => {
  const {
    date, subject, headerImage, quoteOfDay, quotedContext, featuredPost, news, announcements, events
  } = fields;

  const release = new ReleaseModel();

  release.date = date;
  release.subject = subject;
  release.headerImage = headerImage;
  release.quoteOfDay = quoteOfDay;
  release.quotedContext = quotedContext;
  release.featuredPost = featuredPost;

  release.news = news;
  release.announcements = announcements;
  release.events = events;

  return (await release.save()).toJSON();
};

export const read = async (id: string): Promise<Release> => {
  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);
  return foundRelease.toJSON();
};

export const fetchReleaseByDate = async (requestedDate: number): Promise<Release> => {
  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ date: requestedDate });
  if (!foundRelease) throw new DocumentNotFoundError(requestedDate.toString());
  return foundRelease.toJSON();
};

export const update = async (id: string, fields: Partial<Release>): Promise<Release> => {
  const {
    date, subject, headerImage, quoteOfDay, quotedContext, featuredPost, news, announcements, events
  } = fields;

  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);

  if (date) foundRelease.date = date;
  if (subject) foundRelease.subject = subject;
  if (headerImage) foundRelease.headerImage = headerImage;
  if (quoteOfDay) foundRelease.quoteOfDay = quoteOfDay;
  if (quotedContext) foundRelease.quotedContext = quotedContext;
  if (featuredPost) foundRelease.featuredPost = featuredPost;

  if (news) foundRelease.news = news;
  if (announcements) foundRelease.announcements = announcements;
  if (events) foundRelease.events = events;

  return (await foundRelease.save()).toJSON();
};

export const remove = async (id: string): Promise<void> => {
  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);
  return foundRelease.remove();
};
