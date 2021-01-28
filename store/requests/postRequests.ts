import { createBackendAxiosRequest } from 'store/requests';
import { Post, PostStatus } from 'types/post';
import { RequestReturnType } from 'types/state';

export const fetchAllPostsRequest = <D>(

) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/posts'
});

export const fetchWithStatusRequest = <D>(
  status: PostStatus = 'approved'
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/posts?status=${status}`
});

export const fetchSubmissionsRequest = <D>(

) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/posts/submissions'
});

export const fetchPostsToReviewRequest = <D>(

) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: '/posts/review'
});

export const createPostRequest = <D>(
  fields: Omit<Post, '_id'>
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'POST',
  url: '/posts',
  data: fields
});

export const fetchPostByIdRequest = <D>(
  id: string
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/posts/${id}`
});

export const updatePostByIdRequest = <D>(
  id: string, update: Partial<Post>
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'PUT',
  url: `/posts/${id}`,
  data: update
});

export const deletePostByIdRequest = <D>(
  id: string
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'DELETE',
  url: `/posts/${id}`
});

export const fetchPostsByDateRequest = <D>(
  date: number
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/posts/${date}`
});
