import { DocumentNotFoundError } from 'errors';
import { ReleaseModel } from 'models';

import { getMidnightDate } from 'utils';
import { Release, ReleaseDocument, CreateReleaseType } from 'types/release';

export const create = async (fields: CreateReleaseType): Promise<Release> => {
  const {
    date, subject, headerImage, quoteOfDay, quotedContext, featuredPost, news, announcements, events
  } = fields;

  const release = new ReleaseModel();

  release.date = getMidnightDate(date);
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
  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ date: getMidnightDate(requestedDate) });
  if (!foundRelease) throw new DocumentNotFoundError(getMidnightDate(requestedDate).toString());
  return foundRelease.toJSON();
};

export const fetchOrCreateReleaseByDate = async (requestedPublicationDate: number): Promise<Release> => {
  try {
    const foundRelease = await fetchReleaseByDate(requestedPublicationDate);
    return foundRelease;
  } catch (_error) {
    const foundRelease = await create({
      date: requestedPublicationDate,

      headerImage: '',
      subject: '',
      quoteOfDay: '',
      quotedContext: '',
      featuredPost: null,

      news: [],
      announcements: [],
      events: []
    });

    return foundRelease;
  }
};

export const update = async (id: string, fields: Partial<Release>): Promise<Release> => {
  const {
    date, subject, headerImage, quoteOfDay, quotedContext, featuredPost, news, announcements, events
  } = fields;

  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);

  if (date) foundRelease.date = getMidnightDate(date);
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
