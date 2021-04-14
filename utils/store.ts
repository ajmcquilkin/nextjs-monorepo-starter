import axios, { AxiosError } from 'axios';
import { Code } from 'types/state';

export const getErrorPayload = <T = any>(error: Error | AxiosError<T>): { message: string, code: Code } => {
  if (axios.isAxiosError(error)) {
    return ({
      message: error.message,
      code: error.response?.status || error.code || error.name || null
    });
  }

  return ({
    message: error.message,
    code: error.name || null
  });
};
