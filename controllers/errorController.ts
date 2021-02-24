import { BaseError } from 'errors';
import { ServerRequestType, ServerResponseType, ServerFailurePayload } from 'types/server';

export const handleError = (
  error: Error, req: ServerRequestType, res: ServerResponseType<ServerFailurePayload>
): void => {
  const responsePayload: ServerFailurePayload = { meta: { message: error.message, success: false, isAuthenticated: !!req?.session?.info } };
  return res.status(error instanceof BaseError ? (Number(error.code) || 500) : 500).json(responsePayload);
};
