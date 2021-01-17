import { AxiosResponse } from 'axios';
import { createBackendAxiosRequest } from 'store/requests';
import { Post, PostStatus } from 'types/post';

export const fetchAllPostsRequest = <D>(

) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/posts'
});

export const fetchWithStatusRequest = <D>(
  status: PostStatus = 'approved'
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/posts?status=${status}`
});

export const fetchSubmissionsRequest = <D>(

) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/posts/submissions'
});

export const fetchPostsToReviewRequest = <D>(

) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/posts/review'
});

export const createItemRequest = <D>(
  fields: Post
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'POST',
  url: '/posts',
  data: fields
});

export const fetchItemByIdRequest = <D>(
  id: string
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/posts/${id}`
});

export const updateItemByIdRequest = <D>(
  id: string, update: Partial<Post>
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'PUT',
  url: `/posts/${id}`,
  data: update
});

export const deleteItemByIdRequest = <D>(
  id: string
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'DELETE',
  url: `/posts/${id}`
});
