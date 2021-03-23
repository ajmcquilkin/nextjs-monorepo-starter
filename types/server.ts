import { Session } from 'express-session';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'types/user';

export interface ServerSessionInfo {
  name: User['name'], // First M. Last
  netId: User['netId'], // f######

  affiliation: string, // 'DART'
  uid: number,
  attributes: Record<string, any>,

  isReviewer: boolean,
  isStaff: boolean
}

export interface ServerSession extends Session {
  casUser: string, // First M. Last@dartmouth.edu
  info: ServerSessionInfo
}

export interface ServerPayload<D> {
  data: D,
  meta?: {
    success: boolean,
    message?: string,
    isAuthenticated?: boolean
  }
}

export type ServerSuccessPayload<D> = Required<ServerPayload<D>>;
export type ServerFailurePayload = Required<Pick<ServerPayload<never>, 'meta'>>;

export type ServerRequestType = NextApiRequest & {
  session: ServerSession
};

export type ServerResponseType<T = any> = NextApiResponse<T>;
