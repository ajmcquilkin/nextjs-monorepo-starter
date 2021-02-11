import * as releaseController from 'controllers/releaseController';

import { DocumentNotFoundError } from 'errors';
import { PostModel } from 'models';

import { getMidnightDate } from 'utils';

import { Post, PostDocument, PostStatus } from 'types/post';
import { Release } from 'types/release';

type CreatePostType = Pick<Post,
  'fromName' | 'fromAddress' | 'submitterNetId' | 'type' | 'fullContent' |
  'briefContent' | 'url' | 'requestedPublicationDate' | 'status' | 'recipientGroups'
>;

export const create = async (fields: CreatePostType): Promise<Post> => {
  const {
    fromName, fromAddress, submitterNetId, type, fullContent,
    briefContent, url, requestedPublicationDate, status
  } = fields;

  const post = new PostModel();

  post.fromName = fromName;
  post.fromAddress = fromAddress;
  post.submitterNetId = submitterNetId;
  post.type = type;

  post.fullContent = fullContent;

  post.briefContent = briefContent;
  post.url = url;
  post.status = status;

  post.requestedPublicationDate = getMidnightDate(requestedPublicationDate);

  if (requestedPublicationDate && status === 'approved') {
    await releaseController.fetchOrCreateReleaseByDate(requestedPublicationDate);
  }

  return (await post.save()).toJSON();
};

export const read = async (id: string): Promise<Post> => {
  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);
  return foundPost.toJSON();
};

export const update = async (id: string, fields: Partial<Post>): Promise<Post> => {
  const {
    fromName, fromAddress, submitterNetId,
    type, fullContent, briefContent, url, requestedPublicationDate,
    status, reviewComment
  } = fields;

  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);

  if (fromName) foundPost.fromName = fromName;
  if (fromAddress) foundPost.fromAddress = fromAddress;
  if (submitterNetId) foundPost.submitterNetId = submitterNetId;

  if (type) foundPost.type = type;
  if (fullContent) foundPost.fullContent = fullContent;
  if (briefContent) foundPost.briefContent = briefContent;
  if (url) foundPost.url = url;

  if (status) foundPost.status = status;
  if (reviewComment) foundPost.reviewComment = reviewComment;
  if (requestedPublicationDate) foundPost.requestedPublicationDate = getMidnightDate(requestedPublicationDate);

  if (status === 'approved' && (requestedPublicationDate ?? foundPost.requestedPublicationDate)) {
    await releaseController.fetchOrCreateReleaseByDate(requestedPublicationDate ?? foundPost.requestedPublicationDate);
  }

  foundPost.lastEdited = Date.now();
  return (await foundPost.save()).toJSON();
};

export const remove = async (id: string): Promise<void> => {
  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);
  return foundPost.remove();
};

export const readAll = async (): Promise<Post[]> => {
  const foundPosts: PostDocument[] = await PostModel.find({});
  return foundPosts;
};

export const readAllByDate = async (date: number): Promise<Post[]> => {
  const foundPosts: PostDocument[] = await PostModel.find({ requestedPublicationDate: getMidnightDate(date) });
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

export const fetchPostsForGroups = async (groups: string[]): Promise<Post[]> => {
  const foundPosts: PostDocument[] = await PostModel.find({
    recipientGroups: {
      $in: groups
    }
  });

  return foundPosts;
};
