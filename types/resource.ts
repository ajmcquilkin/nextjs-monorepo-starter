import { Document } from 'mongoose';
import { Action } from 'types/state';

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

/* -------- State -------- */

export interface ResourceState {
  resources: Record<string, Resource>,
  results: string[],
  numResults: number
}

/* -------- Action Types -------- */

export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCE_RESULTS = 'FETCH_RESOURCE_RESULTS';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';

export type FetchResourceData = { resource: Resource };
export type FetchResourcesData = { resources: Resource[] };
export type FetchResourceResultsData = { resources: Resource[], results: string[], numResults: number };
export type DeleteResourceData = { id: string };

type FetchResourceAction = Action<typeof FETCH_RESOURCE, FetchResourceData>
type FetchResourceResultsAction = Action<typeof FETCH_RESOURCE_RESULTS, FetchResourceResultsData>
type FetchResourcesAction = Action<typeof FETCH_RESOURCES, FetchResourcesData>
type DeleteResourceAction = Action<typeof DELETE_RESOURCE, DeleteResourceData>

export type ResourceActions = FetchResourcesAction | FetchResourceResultsAction | FetchResourceAction | DeleteResourceAction;
export type ResourceActionTypes = typeof FETCH_RESOURCE | typeof FETCH_RESOURCE_RESULTS | typeof FETCH_RESOURCE | typeof DELETE_RESOURCE;
