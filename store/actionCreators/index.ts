import { AxiosError } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { Empty } from 'types/generic';
import {
  ActionTypes, ActionPayload, Actions,
  RequestReturnType, RootState
} from 'types/state';
import { ServerPayload } from 'types/server';

type AsyncActionCreatorConfig<Data, AddlPayload> = {
  successCallback?: (res: RequestReturnType<Data>) => void,
  failureCallback?: (res: RequestReturnType<Data>) => void,
  additionalPayloadFields?: AddlPayload
}

export const generateSuccessPayload = <Data, AddlPayload>(
  response: RequestReturnType<Data>,
  // additionalPayloadFields?: AddlPayload
): ActionPayload<Data> => ({
    // data: { ...response.data.data, ...additionalPayloadFields },
    data: response.data.data,
    code: response.status || null
  });

export const generateFailurePayload = <Data>(
  error: AxiosError<ServerPayload<Data>>
): ActionPayload => ({
    data: {},
    message: error.response?.data?.meta?.message || error.message || 'No message found',
    code: error.response?.status || error.code || null,
  });

export const createAsyncActionCreator = async <Data, AddlPayload = any>(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  type: ActionTypes,
  axiosFetchCallback: () => Promise<RequestReturnType<Data>>,
  config: AsyncActionCreatorConfig<Data, AddlPayload> = {}
): Promise<void> => {
  try {
    dispatch({ type, status: 'REQUEST', payload: { data: {} as any } });
    const response = await axiosFetchCallback();

    dispatch({
      type,
      status: 'SUCCESS',
      payload: generateSuccessPayload<Data, AddlPayload>(response, config.additionalPayloadFields)
    } as Actions);

    if (config.successCallback) { config.successCallback(response); }
  } catch (error) {
    dispatch({
      type,
      status: 'FAILURE',
      payload: generateFailurePayload<Empty>(error)
    });

    if (config.failureCallback) { config.failureCallback(error); }
  }
};
