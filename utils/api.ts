import nc, { NextConnect, NextHandler } from 'next-connect';
import createSession from 'express-session';
import MongoStoreThunk from 'connect-mongo';

import { IncompleteRequestError } from 'errors';
import { handleError } from 'controllers/errorController';

import { casInstance } from 'utils/auth';
import { dbConnectionOptions } from 'utils/db';
import { ServerRequestType, ServerResponseType, ServerSuccessPayload } from 'types/server';

const MongoStore = MongoStoreThunk(createSession);

const sessionConfig = {
  secret: __SESSION_SECRET__,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: __MODE__ !== 'dev' },
  store: new MongoStore({
    url: __MONGODB_URI__,
    mongoOptions: {
      useNewUrlParser: dbConnectionOptions.useNewUrlParser,
      useUnifiedTopology: dbConnectionOptions.useUnifiedTopology
    },
    secret: __AUTH_SECRET__ // encrypts DB traffic
  })
};

const session = createSession(sessionConfig);

export interface DefaultHandlerConfigOptions {
  requireAuth?: boolean
}

/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-empty-function */
export const createDefaultHandler = <Data = unknown>({
  requireAuth = true
}: DefaultHandlerConfigOptions = {}): NextConnect<ServerRequestType, ServerResponseType<ServerSuccessPayload<Data>>> => nc({
  onError: handleError
}).use(session).use(requireAuth ? casInstance.authenticate : (_req, _res, next) => next());
/* eslint-enable @typescript-eslint/no-empty-function */
/* eslint-enable indent */

export const createSuccessPayload = <T>(data: T): ServerSuccessPayload<T> => ({
  data, meta: { success: true }
});

export const requireUrlParam = (param: string) => (req: ServerRequestType, _res: ServerResponseType, next: NextHandler): void => {
  if (!req.query?.[param]) throw new IncompleteRequestError(`${param}`, `Missing "${param}" url parameter`);
  next();
};
