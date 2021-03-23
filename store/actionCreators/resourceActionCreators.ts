import { createAsyncActionCreator, AsyncActionCreatorConfig } from 'store/actionCreators';
import * as resourceRequests from 'store/requests/resourceRequests';

import { Empty } from 'types/generic';
import { FetchResourceData, DeleteResourceData, EditableResource } from 'types/resource';
import { ThunkResult } from 'types/state';

export const fetchResourceById = (
  id: string,
  additionalConfig: AsyncActionCreatorConfig<FetchResourceData, Empty> = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RESOURCE',
  () => resourceRequests.fetchResourceByIdRequest(id),
  additionalConfig
);

export const createResource = (
  fields: EditableResource,
  additionalConfig: AsyncActionCreatorConfig<FetchResourceData, Empty> = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RESOURCE',
  () => resourceRequests.createResource(fields),
  additionalConfig
);

export const updateResourceById = (
  id: string,
  fields: EditableResource,
  additionalConfig: AsyncActionCreatorConfig<FetchResourceData, Empty> = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RESOURCE',
  () => resourceRequests.updateResourceByIdRequest(id, fields),
  additionalConfig
);

export const deleteResourceById = (
  id: string,
  additionalConfig: AsyncActionCreatorConfig<DeleteResourceData, Empty> = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'DELETE_RESOURCE',
  () => resourceRequests.deleteResourceByIdRequest(id),
  additionalConfig
);
