import { Types } from 'mongoose';

import * as postController from 'controllers/postController';

import { BaseError, DocumentNotFoundError } from 'errors';
import { ReleaseModel } from 'models';

import { getDefaultMidnightDate } from 'utils/time';

import { Post } from 'types/post';
import {
  Release, ReleaseDocument, CreateReleaseType, PopulatedRelease
} from 'types/release';

export const validate = async (release: Release): Promise<PopulatedRelease> => {
  const foundPosts = await postController.fetchPostsForRelease(release);
  const foundPostsMap = foundPosts.reduce((accum, post) => ({ ...accum, [post._id]: !!post }), {});

  let shouldUpdateRelease = false;
  const shouldUpdateFeaturedPost = !!(release.featuredPost && !foundPostsMap?.[release.featuredPost]);

  const newsMap: Record<string, boolean> = release.news.reduce((accum, id) => {
    const doesExist: boolean = foundPostsMap?.[id] || false;
    shouldUpdateRelease ||= !doesExist;
    return ({ ...accum, [id]: doesExist });
  }, {});

  const announcementsMap: Record<string, boolean> = release.announcements.reduce((accum, id) => {
    const doesExist: boolean = foundPostsMap?.[id] || false;
    shouldUpdateRelease ||= !doesExist;
    return ({ ...accum, [id]: doesExist });
  }, {});

  const eventsMap: Record<string, boolean> = release.events.reduce((accum, id) => {
    const doesExist: boolean = foundPostsMap?.[id] || false;
    shouldUpdateRelease ||= !doesExist;
    return ({ ...accum, [id]: doesExist });
  }, {});

  shouldUpdateRelease ||= shouldUpdateFeaturedPost;

  let returnedRelease: Release = release;
  let returnedPosts: Post[] = foundPosts;

  if (shouldUpdateRelease) {
    const updatedNews = release.news.filter((id) => !!newsMap?.[id]);
    const updatedAnnouncements = release.announcements.filter((id) => !!announcementsMap?.[id]);
    const updatedEvents = release.events.filter((id) => !!eventsMap?.[id]);

    const updatedRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: release._id });

    if (shouldUpdateFeaturedPost) { updatedRelease.featuredPost = null; }
    updatedRelease.news = updatedNews;
    updatedRelease.announcements = updatedAnnouncements;
    updatedRelease.events = updatedEvents;

    returnedRelease = (await updatedRelease.save()).toJSON();
    returnedPosts = foundPosts.filter((post) => !!post);
  }

  return ({ release: returnedRelease, posts: returnedPosts });
};

export const create = async (fields: CreateReleaseType): Promise<Release> => {
  const {
    date, subject, headerImage, headerImageCaption, headerImageAlt,
    quoteOfDay, quotedContext, featuredPost, news, announcements, events
  } = fields;

  const release = new ReleaseModel();

  release.date = +getDefaultMidnightDate(date);

  release.subject = subject;
  release.headerImage = headerImage;
  release.headerImageCaption = headerImageCaption;
  release.headerImageAlt = headerImageAlt;

  release.quoteOfDay = quoteOfDay;
  release.quotedContext = quotedContext;
  release.featuredPost = featuredPost;

  release.news = news;
  release.announcements = announcements;
  release.events = events;

  return (await release.save()).toJSON();
};

export const read = async (id: string): Promise<PopulatedRelease> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);

  const { release, posts } = await validate(foundRelease);
  return ({ release, posts });
};

export const fetchReleaseByDate = async (requestedDate: number): Promise<PopulatedRelease> => {
  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ date: +getDefaultMidnightDate(requestedDate) });
  if (!foundRelease) throw new DocumentNotFoundError(getDefaultMidnightDate(requestedDate).toString());

  const { release, posts } = await validate(foundRelease);
  return ({ release, posts });
};

export const fetchOrCreateReleaseByDate = async (requestedPublicationDate: number): Promise<PopulatedRelease> => {
  try {
    const foundRelease = await fetchReleaseByDate(requestedPublicationDate);
    return foundRelease;
  } catch (_error) {
    const foundRelease = await create({
      date: requestedPublicationDate,

      headerImage: '',
      headerImageCaption: '',
      headerImageAlt: '',

      subject: '',
      quoteOfDay: '',
      quotedContext: '',
      featuredPost: null,

      news: [],
      announcements: [],
      events: []
    });

    const posts: Post[] = [];

    return ({ release: foundRelease, posts });
  }
};

export const update = async (id: string, fields: Partial<Release>): Promise<PopulatedRelease> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const {
    date, subject, headerImage, headerImageCaption, headerImageAlt,
    quoteOfDay, quotedContext, featuredPost, news, announcements, events
  } = fields;

  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);

  if (date) foundRelease.date = +getDefaultMidnightDate(date);

  if (subject) foundRelease.subject = subject;
  if (headerImage) foundRelease.headerImage = headerImage;
  if (headerImageCaption) foundRelease.headerImageCaption = headerImageCaption;
  if (headerImageAlt) foundRelease.headerImageAlt = headerImageAlt;

  if (quoteOfDay) foundRelease.quoteOfDay = quoteOfDay;
  if (quotedContext) foundRelease.quotedContext = quotedContext;
  if (featuredPost !== undefined) foundRelease.featuredPost = featuredPost;

  if (news) foundRelease.news = news;
  if (announcements) foundRelease.announcements = announcements;
  if (events) foundRelease.events = events;

  const newFoundRelease = (await foundRelease.save()).toJSON();
  const { release, posts } = await validate(newFoundRelease);
  return ({ release, posts });
};

export const remove = async (id: string): Promise<void> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const foundRelease: ReleaseDocument = await ReleaseModel.findOne({ _id: id });
  if (!foundRelease) throw new DocumentNotFoundError(id);
  return foundRelease.remove();
};
