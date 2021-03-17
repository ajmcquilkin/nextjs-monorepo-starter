import sanitizeHTML from 'sanitize-html';
import pickBy from 'lodash.pickby';
import { FilterQuery, Types } from 'mongoose';

import * as releaseController from 'controllers/releaseController';

import { BaseError, DocumentNotFoundError } from 'errors';
import { PostModel } from 'models';

import { getDefaultMidnightDate } from 'utils/time';

import { Post, PostDocument, PostStatus } from 'types/post';
import { Release } from 'types/release';

type CreatePostType = Pick<Post,
  'fromName' | 'fromAddress' | 'submitterNetId' | 'type' | 'fullContent' | 'briefContent' | 'url' |
  'requestedPublicationDate' | 'status' | 'recipientGroups' | 'featuredImage' | 'featuredImageAlt' | 'eventDate' | 'eventTime'
>;

export const create = async (fields: CreatePostType): Promise<Post> => {
  const {
    fromName, fromAddress, submitterNetId, type, fullContent, recipientGroups, briefContent,
    url, requestedPublicationDate, status, featuredImage, featuredImageAlt, eventDate, eventTime
  } = fields;

  const post = new PostModel();

  post.fromName = fromName;
  post.fromAddress = fromAddress;
  post.submitterNetId = submitterNetId;
  post.type = type;

  post.briefContent = briefContent;
  post.url = url;
  post.status = status;

  post.featuredImage = featuredImage;
  post.featuredImageAlt = featuredImageAlt;
  post.eventDate = eventDate;
  post.eventTime = eventTime;

  post.recipientGroups = recipientGroups;
  post.requestedPublicationDate = +getDefaultMidnightDate(requestedPublicationDate);
  post.fullContent = sanitizeHTML(fullContent);

  if (requestedPublicationDate && status === 'approved') {
    await releaseController.fetchOrCreateReleaseByDate(requestedPublicationDate);
  }

  return (await post.save()).toJSON();
};

export const read = async (id: string): Promise<Post> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);
  return foundPost.toJSON();
};

export const update = async (id: string, fields: Partial<Post>): Promise<Post> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const {
    fromName, fromAddress, submitterNetId, type, fullContent,
    briefContent, url, requestedPublicationDate, recipientGroups, status,
    rejectionComment, rejectionReason, featuredImage, featuredImageAlt, eventDate, eventTime
  } = fields;

  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);

  if (fromName) foundPost.fromName = fromName;
  if (fromAddress) foundPost.fromAddress = fromAddress;
  if (submitterNetId) foundPost.submitterNetId = submitterNetId;

  if (type) foundPost.type = type;
  if (briefContent) foundPost.briefContent = briefContent;
  if (url) foundPost.url = url;
  if (recipientGroups) foundPost.recipientGroups = recipientGroups;

  if (status) foundPost.status = status;
  if (rejectionComment !== undefined) foundPost.rejectionComment = rejectionComment;
  if (rejectionReason !== undefined) foundPost.rejectionReason = rejectionReason;

  if (featuredImage) foundPost.featuredImage = featuredImage;
  if (featuredImageAlt) foundPost.featuredImageAlt = featuredImageAlt;
  if (eventDate !== undefined) foundPost.eventDate = eventDate;
  if (eventTime !== undefined) foundPost.eventTime = eventTime;

  if (requestedPublicationDate) foundPost.requestedPublicationDate = +getDefaultMidnightDate(requestedPublicationDate);
  if (fullContent) foundPost.fullContent = sanitizeHTML(fullContent);

  if (status === 'approved' && (requestedPublicationDate ?? foundPost.requestedPublicationDate)) {
    await releaseController.fetchOrCreateReleaseByDate(requestedPublicationDate ?? foundPost.requestedPublicationDate);
  }

  foundPost.lastEdited = Date.now();
  return (await foundPost.save()).toJSON();
};

export const updateMany = async (filter: FilterQuery<PostDocument>, fields: Partial<Post>): Promise<void> => {
  const {
    fromName, fromAddress, submitterNetId, type, fullContent,
    briefContent, url, requestedPublicationDate, recipientGroups, status,
    rejectionComment, rejectionReason, featuredImage, featuredImageAlt, eventDate, eventTime
  } = fields;

  await PostModel.updateMany(filter, pickBy({
    fromName,
    fromAddress,
    submitterNetId,
    type,
    fullContent,
    briefContent,
    url,
    requestedPublicationDate,
    recipientGroups,
    status,
    rejectionComment,
    rejectionReason,
    featuredImage,
    featuredImageAlt,
    eventDate,
    eventTime
  }, (value) => value !== undefined));
};

export const remove = async (id: string): Promise<void> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);
  return foundPost.remove();
};

export const readAll = async (): Promise<Post[]> => {
  const foundPosts: PostDocument[] = await PostModel.find({});
  return foundPosts;
};

export const readAllByDate = async (date: number): Promise<Post[]> => {
  const foundPosts: PostDocument[] = await PostModel.find({ requestedPublicationDate: +getDefaultMidnightDate(date) });
  return foundPosts;
};

export const readAllByStatus = async (status: PostStatus): Promise<Post[]> => {
  const foundPosts: PostDocument[] = await PostModel.find({ status });
  return foundPosts;
};

export const fetchPostsForRelease = async (release: Release): Promise<Post[]> => {
  const postsToFetch = [...release.news, ...release.announcements, ...release.events];
  if (release.featuredPost) postsToFetch.push(release.featuredPost);

  const foundPosts = await PostModel.find({ _id: { $in: postsToFetch } });
  return foundPosts;
};

export const fetchPostsByNetId = async (netId: string): Promise<Post[]> => {
  const foundPosts = await PostModel.find({ submitterNetId: netId });
  return foundPosts;
};
