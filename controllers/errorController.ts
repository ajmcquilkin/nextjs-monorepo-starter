import { BaseError } from 'errors';
import { ServerRequestType, ServerResponseType, ServerFailurePayload } from 'types/server';

export const handleError = (
  error: Error, _req: ServerRequestType, res: ServerResponseType<ServerFailurePayload>
): void => {
  const responsePayload: ServerFailurePayload = { meta: { message: error.message, success: false } };
  return res.status(error instanceof BaseError ? (Number(error.code) || 500) : 500).json(responsePayload);
};
