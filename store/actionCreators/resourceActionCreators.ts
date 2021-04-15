import { ResourceActions, EditableResource } from 'types/resource';

export const createResource = (fields: EditableResource): ResourceActions => ({
  type: 'CREATE_RESOURCE',
  payload: { data: { fields } },
  status: 'REQUEST'
});

export const fetchResourceById = (id: string): ResourceActions => ({
  type: 'FETCH_RESOURCE',
  payload: { data: { id } },
  status: 'REQUEST'
});

export const updateResourceById = (id: string, fields: EditableResource): ResourceActions => ({
  type: 'UPDATE_RESOURCE',
  payload: { data: { id, fields } },
  status: 'REQUEST'
});

export const deleteResourceById = (id: string): ResourceActions => ({
  type: 'DELETE_RESOURCE',
  payload: { data: { id } },
  status: 'REQUEST'
});
