import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import { Action, ActionTypes, Code } from 'types/state';

type AsyncActionCreatorConfig<Data, AddlPayload> = {
  successCallback?: (res: AxiosResponse<Data>) => void,
  failureCallback?: (res: AxiosResponse<Data>) => void,
  additionalPayloadFields?: AddlPayload
}

export type SuccessPayload<Data> = {
  data: Data,
  code: Code
}

export type FailurePayload<Data> = {
  data: Data,
  message?: string,
  code: Code
}

export const generateSuccessPayload = <Data, AddlPayload>(
  response: AxiosResponse<Data>,
  additionalPayloadFields: AddlPayload
): SuccessPayload<Data> => ({
    data: { ...response.data, ...additionalPayloadFields },
    code: response.status || null
  });

export const generateFailurePayload = <Data>(
  error: AxiosError<Data>
): FailurePayload<Data> => ({
    data: undefined,
    message: error.message || 'No message found',
    code: error.response?.status || error.code || null,
  });

export const createAsyncActionCreator = async <Data, AddlPayload = any>(
  dispatch: Dispatch<Action<ActionTypes, Data>>,
  type: ActionTypes,
  axiosFetchCallback: () => Promise<AxiosResponse<Data>>,
  config: AsyncActionCreatorConfig<Data, AddlPayload> = {}
): Promise<void> => {
  try {
    dispatch({ type, status: 'REQUEST', payload: { data: undefined } });
    const response = await axiosFetchCallback();
    dispatch({ type, status: 'SUCCESS', payload: generateSuccessPayload<Data, AddlPayload>(response, config.additionalPayloadFields) });
    if (config.successCallback) { config.successCallback(response); }
  } catch (error) {
    dispatch({ type, status: 'FAILURE', payload: generateFailurePayload<Data>(error) });
    if (config.failureCallback) { config.failureCallback(error); }
  }
};
