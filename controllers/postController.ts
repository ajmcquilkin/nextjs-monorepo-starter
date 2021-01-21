import { DocumentNotFoundError } from 'errors';
import { PostModel } from 'models';

import { Post, PostDocument } from 'types/post';

type CreatePostType = Pick<Post,
  'fromName' | 'fromAddress' | 'submitterNetId' | 'type' | 'fullContent' |
  'briefContent' | 'url' | 'requestedPublicationDate' | 'status'
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
  post.requestedPublicationDate = requestedPublicationDate;
  post.status = status;

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
    type, fullContent, briefContent, url, publishOrder, requestedPublicationDate,
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
  if (publishOrder) foundPost.publishOrder = publishOrder;
  if (requestedPublicationDate) foundPost.requestedPublicationDate = requestedPublicationDate;

  if (status) foundPost.status = status;
  if (reviewComment) foundPost.reviewComment = reviewComment;

  foundPost.lastEdited = Date.now();
  return (await foundPost.save()).toJSON();
};

export const remove = async (id: string): Promise<void> => {
  const foundPost: PostDocument = await PostModel.findOne({ _id: id });
  if (!foundPost) throw new DocumentNotFoundError(id);
  return foundPost.remove();
};

export const readAll = async (): Promise<Post[]> => {
  const foundPosts: PostDocument[] = PostModel.find({});
  return foundPosts;
};
