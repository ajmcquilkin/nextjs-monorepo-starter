import { createBackendAxiosRequest } from 'store/requests';

import { FetchResourceData, DeleteResourceData, EditableResource } from 'types/resource';
import { RequestReturnType } from 'types/state';

export const createResource = (
  fields: EditableResource
): Promise<RequestReturnType<FetchResourceData>> => createBackendAxiosRequest({
  method: 'POST',
  url: '/resources',
  data: fields
});

export const fetchResourceByIdRequest = (
  id: string
): Promise<RequestReturnType<FetchResourceData>> => createBackendAxiosRequest({
  method: 'GET',
  url: `/resources/${id}`
});

export const updateResourceByIdRequest = (
  id: string,
  fields: Partial<EditableResource>
): Promise<RequestReturnType<FetchResourceData>> => createBackendAxiosRequest({
  method: 'PATCH',
  url: `/resources/${id}`,
  data: fields
});

export const deleteResourceByIdRequest = (
  id: string
): Promise<RequestReturnType<DeleteResourceData>> => createBackendAxiosRequest({
  method: 'DELETE',
  url: `/resources/${id}`
});
