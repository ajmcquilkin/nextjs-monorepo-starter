import { Document } from 'mongoose';

import { hasField, hasKey, isValidObject } from 'types/generic';
import { AsyncAction } from 'types/state';

/* -------- Generic -------- */

export interface Resource {
  content: string,
  link: string | null,
  dateItemCreated: Date,
  lastEdited: Date,

  _id: string
}

export type EditableResource = Pick<Resource, 'content' | 'link'>;

export type ResourceDocument = Resource & Document<string>;
export type NovelResourceReference = { id: string, isNew: boolean };

export function isResource(obj: unknown): obj is Resource {
  if (!isValidObject(obj)) return false;

  if (!hasField(obj, 'content', 'string')) return false;
  if (!hasField(obj, '_id', 'string')) return false;

  if (!hasKey(obj, 'dateItemCreated')) return false;
  if (!(obj.dateItemCreated instanceof Date)) return false;

  if (!hasKey(obj, 'lastEdited')) return false;
  if (!(obj.lastEdited instanceof Date)) return false;

  if (!hasKey(obj, 'link')) return false;
  if (obj.link !== null && typeof obj.link !== 'string') return false;

  return true;
}

/* -------- State -------- */

export interface ResourceState {
  resources: Record<string, Resource>,
  results: string[],
  numResults: number
}

/* -------- Action Types -------- */

export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';

export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCE_RESULTS = 'FETCH_RESOURCE_RESULTS';

export type FetchResourceData = { resource: Resource };
export type FetchResourcesData = { resources: Resource[] };
export type DeleteResourceData = { id: string };
export type FetchResourceResultsData = { resources: Resource[], results: string[], numResults: number };

type CreateResourceActions = AsyncAction<typeof CREATE_RESOURCE, FetchResourceData, { fields: EditableResource }>
type FetchResourceActions = AsyncAction<typeof FETCH_RESOURCE, FetchResourceData, { id: string }>
type UpdateResourceActions = AsyncAction<typeof UPDATE_RESOURCE, FetchResourceData, { id: string, fields: EditableResource }>
type DeleteResourceActions = AsyncAction<typeof DELETE_RESOURCE, DeleteResourceData, { id: string }>

type FetchResourcesActions = AsyncAction<typeof FETCH_RESOURCES, FetchResourcesData>
type FetchResourceResultsActions = AsyncAction<typeof FETCH_RESOURCE_RESULTS, FetchResourceResultsData>

export type ResourceActions =
  CreateResourceActions |
  FetchResourcesActions |
  UpdateResourceActions |
  FetchResourceResultsActions |
  FetchResourceActions |
  DeleteResourceActions;

export type ResourceActionTypes =
  typeof CREATE_RESOURCE |
  typeof FETCH_RESOURCE |
  typeof UPDATE_RESOURCE |
  typeof FETCH_RESOURCE_RESULTS |
  typeof FETCH_RESOURCE |
  typeof DELETE_RESOURCE;
