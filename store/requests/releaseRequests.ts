import { createBackendAxiosRequest } from 'store/requests';
import { Release } from 'types/release';
import { RequestReturnType } from 'types/state';

export const fetchReleaseByIdRequest = <D>(
  id: string
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/release/${id}`
});

export const updateReleaseByIdRequest = <D>(
  id: string, update: Partial<Release>
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'PUT',
  url: `/release/${id}`,
  data: update
});

export const deleteReleaseByIdRequest = <D>(
  id: string
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'DELETE',
  url: `/release/${id}`
});

export const createReleaseRequest = <D>(
  fields: Partial<Release>
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'POST',
  url: '/release',
  data: fields
});

export const fetchReleaseByDateRequest = <D>(
  date: number
) => (): Promise<RequestReturnType<D>> => createBackendAxiosRequest<D>({
  method: 'GET',
  url: `/release/date?date=${date}`
});
