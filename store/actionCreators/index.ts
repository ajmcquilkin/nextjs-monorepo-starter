import axios, { AxiosError } from 'axios';

import { Empty } from 'types/generic';
import {
  ActionTypes, ActionPayload, Actions,
  RequestReturnType, GlobalDispatch, Code
} from 'types/state';
import { ServerPayload } from 'types/server';

export type AsyncActionCreatorConfig<Data, AddlPayload> = {
  successCallback?: (res: RequestReturnType<Data>) => void,
  failureCallback?: (error: AxiosError<ServerPayload<Data>>) => void,
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
    } as Actions);

    if (config.successCallback) { config.successCallback(response); }
  } catch (error) {
    let errorName = '';
    let errorMessage = '';
    let errorCode: Code = '';

    if (axios.isAxiosError(error)) {
      dispatch({
        type,
        status: 'FAILURE',
        payload: generateFailurePayload<Empty>(error)
      });

      errorName = error.name;
      errorMessage = (error as AxiosError<ServerPayload<Data>>).response?.data?.meta?.message || 'No associated message';
      errorCode = error.response?.status || error.code || '';
    } else if (error instanceof Error) {
      errorName = error.name;
      errorMessage = error.message;
      errorCode = 'ERR';

      dispatch(() => ({
        type,
        status: 'FAILURE',
        payload: {
          data: {},
          message: error.message,
          code: error.name,
        }
      }));
    } else {
      errorName = 'Unknown Error';
      errorMessage = 'An unknown error has occured. If this message persists, contact a system administrator.';
      errorCode = 'UNKNOWN';

      dispatch(() => ({
        type,
        status: 'FAILURE',
        payload: {
          data: {},
          code: errorCode,
          message: errorMessage
        }
      }));
    }

    if (config.failureCallback) {
      config.failureCallback(error);
    } else {
      dispatch({
        type: 'OPEN_MODAL',
        status: 'SUCCESS',
        payload: {
          data: {
            type: 'ERROR_MODAL',
            config: {
              title: `${errorCode}: ${errorName}`,
              content: errorMessage
            }
          }
        }
      });
    }
  }
};
