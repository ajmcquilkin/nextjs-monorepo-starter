import nc, { NextConnect, NextHandler } from 'next-connect';
import createSession from 'express-session';
import MongoStoreThunk from 'connect-mongo';

import { IncompleteRequestError } from 'errors';
import { handleError } from 'controllers/errorController';

import { casInstance } from 'utils/auth';
import { dbConnectionOptions } from 'utils/db';

import { ServerRequestType, ServerResponseType, ServerSuccessPayload } from 'types/server';

const MongoStore = MongoStoreThunk(createSession);

export interface DefaultHandlerConfigOptions {
  requireAuth?: boolean
}

export const createDefaultHandler = <Data = unknown>({
  requireAuth = true
}: DefaultHandlerConfigOptions = {}): NextConnect<ServerRequestType, ServerResponseType<ServerSuccessPayload<Data>>> => nc({
  onError: handleError
}).use(
  createSession({
    secret: __SESSION_SECRET__,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    unset: 'destroy',
    store: new MongoStore({
      url: __MONGODB_URI__,
      mongoOptions: {
        useNewUrlParser: dbConnectionOptions.useNewUrlParser,
        useUnifiedTopology: dbConnectionOptions.useUnifiedTopology
      },
      secret: __AUTH_SECRET__ // encrypts DB traffic
    }),
  })
).use(requireAuth ? casInstance.authenticate : (_req, _res, next) => next());

export const createSuccessPayload = <T>(data: T): ServerSuccessPayload<T> => ({
  data, meta: { success: true }
});

export const requireUrlParam = (param: string) => (req: ServerRequestType, _res: ServerResponseType, next: NextHandler): void => {
  if (!(param in req.query)) throw new IncompleteRequestError(`${param}`, `Missing "${param}" url parameter`);
  next();
};
