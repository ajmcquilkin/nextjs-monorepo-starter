import { Session } from 'express-session';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ServerSession extends Session {
  casUser: string, // Dartmouth email
  info: {
    name: string, // First Last
    isStaff: boolean,
    isReviewer: boolean,
    netId: string | null // netId
  }
}

export interface ServerPayload<D> {
  data: D,
  meta?: {
    message?: string,
    success: boolean
  }
}

export type ServerSuccessPayload<D> = Required<ServerPayload<D>>;
export type ServerFailurePayload = Required<Pick<ServerPayload<never>, 'meta'>>;

export type ServerRequestType = NextApiRequest & {
  session: ServerSession
};

export type ServerResponseType<T = any> = NextApiResponse<T>;
