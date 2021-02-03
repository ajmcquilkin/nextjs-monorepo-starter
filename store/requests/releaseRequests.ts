import { createBackendAxiosRequest } from 'store/requests';
import { Empty } from 'types/generic';
import { FetchReleaseData, Release } from 'types/release';
import { RequestReturnType } from 'types/state';

export const fetchReleaseByIdRequest = (
  id: string
): Promise<RequestReturnType<FetchReleaseData>> => createBackendAxiosRequest({
  method: 'GET',
  url: `/release/${id}`
});

export const fetchReleaseByDateRequest = (
  date: number
): Promise<RequestReturnType<FetchReleaseData>> => createBackendAxiosRequest({
  method: 'GET',
  url: `/release/date?date=${date}`
});

export const createReleaseRequest = (
  fields: Partial<Release>
): Promise<RequestReturnType<FetchReleaseData>> => createBackendAxiosRequest({
  method: 'POST',
  url: '/release',
  data: fields
});

export const updateReleaseByIdRequest = (
  id: string, update: Partial<Release>
): Promise<RequestReturnType<FetchReleaseData>> => createBackendAxiosRequest({
  method: 'PUT',
  url: `/release/${id}`,
  data: update
});

export const deleteReleaseByIdRequest = (
  id: string
): Promise<RequestReturnType<Empty>> => createBackendAxiosRequest({
  method: 'DELETE',
  url: `/release/${id}`
});
