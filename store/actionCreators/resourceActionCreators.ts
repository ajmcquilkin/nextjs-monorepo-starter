import { ResourceActions, EditableResource } from 'types/resource';

export const createResource = (fields: EditableResource): ResourceActions => ({
  type: 'CREATE_RESOURCE_REQUEST',
  payload: { data: { fields } }
});

export const fetchResourceById = (id: string): ResourceActions => ({
  type: 'FETCH_RESOURCE_REQUEST',
  payload: { data: { id } }
});

export const updateResourceById = (id: string, fields: EditableResource): ResourceActions => ({
  type: 'UPDATE_RESOURCE_REQUEST',
  payload: { data: { id, fields } }
});

export const deleteResourceById = (id: string): ResourceActions => ({
  type: 'DELETE_RESOURCE_REQUEST',
  payload: { data: { id } }
});
