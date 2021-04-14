import { createBackendAxiosRequest } from 'store/requests';
import { hasField, hasKey, isValidObject } from 'types/generic';

import {
  FetchResourceData, DeleteResourceData, EditableResource, isResource
} from 'types/resource';
import { RequestReturnType } from 'types/state';

export const createResource = async (
  fields: EditableResource
): Promise<RequestReturnType<FetchResourceData>> => {
  const result = await createBackendAxiosRequest({
    method: 'POST',
    url: '/resources',
    data: fields
  });

  if (!isValidObject(result.data.data)) throw new Error('Invalid API Response [Object]');
  if (!hasKey(result.data.data, 'resource')) throw new Error('Invalid API Response [Non-existent Field]');

  result.data.data.resource.dateItemCreated = new Date(result.data.data.resource?.dateItemCreated || 0);
  result.data.data.resource.lastEdited = new Date(result.data.data.resource?.lastEdited || 0);

  if (!isResource(result.data.data.resource)) throw new Error('Invalid API Response [Invalid Resource]');

  return result as RequestReturnType<FetchResourceData>;
};

export const fetchResourceByIdRequest = async (
  id: string
): Promise<RequestReturnType<FetchResourceData>> => {
  const result = await createBackendAxiosRequest({
    method: 'GET',
    url: `/resources/${id}`
  });

  if (!isValidObject(result.data.data)) throw new Error('Invalid API Response [Object]');
  if (!hasKey(result.data.data, 'resource')) throw new Error('Invalid API Response [Non-existent Field]');

  result.data.data.resource.dateItemCreated = new Date(result.data.data.resource?.dateItemCreated || 0);
  result.data.data.resource.lastEdited = new Date(result.data.data.resource?.lastEdited || 0);

  if (!isResource(result.data.data.resource)) throw new Error('Invalid API Response [Invalid Resource]');

  return result as RequestReturnType<FetchResourceData>;
};

export const updateResourceByIdRequest = async (
  id: string,
  fields: Partial<EditableResource>
): Promise<RequestReturnType<FetchResourceData>> => {
  const result = await createBackendAxiosRequest({
    method: 'PATCH',
    url: `/resources/${id}`,
    data: fields
  });

  if (!isValidObject(result.data.data)) throw new Error('Invalid API Response [Object]');
  if (!hasKey(result.data.data, 'resource')) throw new Error('Invalid API Response [Non-existent Field]');

  result.data.data.resource.dateItemCreated = new Date(result.data.data.resource?.dateItemCreated || 0);
  result.data.data.resource.lastEdited = new Date(result.data.data.resource?.lastEdited || 0);

  if (!isResource(result.data.data.resource)) throw new Error('Invalid API Response [Invalid Resource]');

  return result as RequestReturnType<FetchResourceData>;
};

export const deleteResourceByIdRequest = async (
  id: string
): Promise<RequestReturnType<DeleteResourceData>> => {
  const result = await createBackendAxiosRequest({
    method: 'DELETE',
    url: `/resources/${id}`
  });

  if (!isValidObject(result.data.data)) throw new Error('Invalid API Response');
  if (!hasField(result.data.data, 'id', 'string')) throw new Error('Invalid API Response');

  return result as RequestReturnType<DeleteResourceData>;
};
