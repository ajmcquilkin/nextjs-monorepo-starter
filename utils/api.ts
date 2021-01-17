import nc, { NextConnect } from 'next-connect';
import createSession from 'express-session';
import MongoStoreThunk from 'connect-mongo';

import { MissingConfigError } from 'errors';
import { handleError } from 'controllers/errorController';

import { dbConnectionOptions } from 'utils/db';
import { ServerRequestType, ServerResponseType, ServerSuccessPayload } from 'types/server';

if (!process.env.SESSION_SECRET) throw new MissingConfigError('SESSION_SECRET');
if (!process.env.MONGODB_URI) throw new MissingConfigError('MONGODB_URI');

const sessionSecret = process.env.SESSION_SECRET as string;
const mongodbUri = process.env.MONGODB_URI as string;

const MongoStore = MongoStoreThunk(createSession);

const sessionConfig = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.MODE !== 'dev' },
  store: new MongoStore({
    url: mongodbUri,
    mongoOptions: {
      useNewUrlParser: dbConnectionOptions.useNewUrlParser,
      useUnifiedTopology: dbConnectionOptions.useUnifiedTopology
    },
    secret: sessionSecret // encrypts DB traffic
  })
};

const session = createSession(sessionConfig);

export const createDefaultHandler = <Data = unknown>(

): NextConnect<ServerRequestType, ServerResponseType<ServerSuccessPayload<Data>>> => nc({
    onError: handleError
  }).use(session);

export const createSuccessPayload = <T>(data: T): ServerSuccessPayload<T> => ({
  data, meta: { success: true }
});
