import { AxiosResponse } from 'axios';
import { createBackendAxiosRequest } from 'store/requests';
import { Post, PostStatus } from 'types/post';

// TODO: Update response types (currently "any")

export const fetchWithStatusRequest = (status: PostStatus = 'approved') => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'GET',
  url: `/items?status=${status}`,
});

export const fetchSubmissionsRequest = () => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'GET',
  url: '/items/submissions'
});

export const fetchPostsToReviewRequest = () => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'GET',
  url: '/items/review'
});

export const createItemRequest = (fields: Post) => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'POST',
  url: '/items',
  data: fields
});

export const fetchItemByIdRequest = (id: string) => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'GET',
  url: `/items/${id}`
});

export const updateItemByIdRequest = (id: string, update: Partial<Post>) => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'PUT',
  url: `/items/${id}`,
  data: update
});

export const deleteItemByIdRequest = (id: string) => (): Promise<AxiosResponse<any>> => createBackendAxiosRequest<any>({
  method: 'DELETE',
  url: `/items/${id}`
});
