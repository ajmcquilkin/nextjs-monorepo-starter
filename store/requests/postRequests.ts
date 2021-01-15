import { AxiosResponse } from 'axios';
import { createBackendAxiosRequest } from 'store/requests';
import { Post, PostStatus } from 'types/post';

export const fetchWithStatusRequest = <D = any>(
  status: PostStatus = 'approved'
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<any>({
  method: 'GET',
  url: `/items?status=${status}`,
});

export const fetchSubmissionsRequest = <D = any>(

) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/items/submissions'
});

export const fetchPostsToReviewRequest = <D = any>(

) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/items/review'
});

export const createItemRequest = <D = any>(
  fields: Post
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'POST',
  url: '/items',
  data: fields
});

export const fetchItemByIdRequest = <D = any>(
  id: string
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/items/${id}`
});

export const updateItemByIdRequest = <D = any>(
  id: string, update: Partial<Post>
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'PUT',
  url: `/items/${id}`,
  data: update
});

export const deleteItemByIdRequest = <D = any>(
  id: string
) => (): Promise<AxiosResponse<D>> => createBackendAxiosRequest<D>({
  method: 'DELETE',
  url: `/items/${id}`
});
