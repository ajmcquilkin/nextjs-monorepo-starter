import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';

import { Empty } from 'types/generic';
import {
  ActionTypes, ActionPayload, Actions,
  RequestReturnType, GlobalDispatch
} from 'types/state';
import { ServerPayload } from 'types/server';

export type AsyncActionCreatorConfig<Data, AddlPayload> = {
  successCallback?: (res: RequestReturnType<Data>, dispatch: Dispatch<Actions>) => void,
  failureCallback?: (error: AxiosError<ServerPayload<Data>>, dispatch: Dispatch<Actions>) => void,
  additionalPayloadFields?: AddlPayload
}

export const generateSuccessPayload = <Data, AddlPayload>(
  response: RequestReturnType<Data>,
  additionalPayloadFields?: AddlPayload
): ActionPayload<Data> => ({
  data: { ...response.data.data, ...additionalPayloadFields },
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
  dispatch: GlobalDispatch,
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
    });

    if (config.successCallback) { config.successCallback(response, dispatch); }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({
        type,
        status: 'FAILURE',
        payload: generateFailurePayload<Empty>(error)
      });
    } else if (error instanceof Error) {
      dispatch({
        type,
        status: 'FAILURE',
        payload: {
          data: {},
          message: error.message,
          code: error.name,
        }
      });
    } else {
      dispatch({
        type,
        status: 'FAILURE',
        payload: {
          data: {},
          code: 'No code available',
          message: error.message
        }
      });
    }

    if (config.failureCallback) config.failureCallback(error, dispatch);
  }
};
