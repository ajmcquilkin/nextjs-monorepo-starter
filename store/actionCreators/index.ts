import { AxiosResponse, AxiosError } from 'axios';
import { RequestStatus } from 'store/helpers';
import { Code } from 'types/action';

interface AsyncActionCreatorConfig {
  successCallback?: (res: any) => void,
  failureCallback?: (res: any) => void,
  responseSubfield?: string,
  additionalPayloadFields?: any
}

export type GenerateSuccessPayload = (
  response: AxiosResponse,
  customParams?: { [key: string]: any },
  subField?: string
) => {
  data: any,
  code: Code
}

export type GenerateFailurePayload = (
  error: AxiosError
) => {
  message: string,
  code: Code
}

export type CreateAsyncActionCreator = (
  dispatch: any,
  actionName: any, // TODO: Update this
  axiosFetchCallback: () => Promise<AxiosResponse>,
  config?: AsyncActionCreatorConfig
) => Promise<void>

export const generateSuccessPayload: GenerateSuccessPayload = (response, customParams = {}, subField = '') => ({
  data: subField ? response.data[subField] : response.data,
  code: response.status,
  ...customParams
});

export const generateFailurePayload: GenerateFailurePayload = (error, customParams = {}) => ({
  message: error.response?.data?.message || error.message || 'No message found',
  code: error.response?.status || error.code || null,
  ...customParams
});

// TODO: Make request and response "any" types more specific
export const createAsyncActionCreator: CreateAsyncActionCreator = async (dispatch, actionName, axiosFetchCallback, config = {}) => {
  try {
    dispatch({ type: `${actionName}_${RequestStatus.request}` });
    const response = await axiosFetchCallback();
    dispatch({ type: `${actionName}_${RequestStatus.success}`, payload: generateSuccessPayload(response, config?.additionalPayloadFields || {}, config?.responseSubfield || '') });
    if (config.successCallback) { config.successCallback(response); }
  } catch (error) {
    dispatch({ type: `${actionName}_${RequestStatus.failure}`, payload: generateFailurePayload(error) });
    if (config.failureCallback) { config.failureCallback(error); }
  }
};
