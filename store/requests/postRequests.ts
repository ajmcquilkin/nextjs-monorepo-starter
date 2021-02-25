import { createBackendAxiosRequest } from 'store/requests';

import { Empty } from 'types/generic';

import {
  FetchPostData, FetchPostsData,
  Post, PostStatus
} from 'types/post';

import { RequestReturnType } from 'types/state';

export const fetchAllPostsRequest = (

): Promise<RequestReturnType<FetchPostsData>> => createBackendAxiosRequest({
  method: 'GET',
  url: '/posts'
});

export const fetchWithStatusRequest = (
  status: PostStatus = 'approved'
): Promise<RequestReturnType<FetchPostsData>> => createBackendAxiosRequest({
  method: 'GET',
  url: `/posts?status=${status}`
});

export const createPostRequest = (
  fields: Pick<Post,
    'type' | 'requestedPublicationDate' | 'submitterNetId' | 'fromName' | 'fromAddress'
    | 'fullContent' | 'briefContent' | 'url' | 'recipientGroups' | 'featuredImage' | 'status'
  >
): Promise<RequestReturnType<FetchPostData>> => createBackendAxiosRequest({
  method: 'POST',
  url: '/posts',
  data: fields
});

export const fetchPostByIdRequest = (
  id: string
): Promise<RequestReturnType<FetchPostData>> => createBackendAxiosRequest({
  method: 'GET',
  url: `/posts/${id}`
});

export const updatePostByIdRequest = (
  id: string, update: Partial<Post>
): Promise<RequestReturnType<FetchPostData>> => createBackendAxiosRequest({
  method: 'PUT',
  url: `/posts/${id}`,
  data: update
});

export const deletePostByIdRequest = (
  id: string
): Promise<RequestReturnType<Empty>> => createBackendAxiosRequest({
  method: 'DELETE',
  url: `/posts/${id}`
});

export const fetchPostsByDateRequest = (
  date: number
): Promise<RequestReturnType<FetchPostsData>> => createBackendAxiosRequest({
  method: 'GET',
  url: `/posts?date=${date}`
});
