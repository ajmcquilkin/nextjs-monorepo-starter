import nc, { NextConnect } from 'next-connect';
import session from 'express-session';

import { MissingConfigError } from 'errors';
import { handleError } from 'controllers/errorController';

import { ServerRequestType, ServerResponseType, ServerSuccessPayload } from 'types/server';

if (!process.env.SESSION_SECRET) throw new MissingConfigError('SESSION_SECRET');
const sessionSecret = process.env.SESSION_SECRET as string;

// ! DO NOT use MemoryStore in production
// TODO: Initialize MongoStore for this token
const sessionConfig = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }, // ! Use this in production for HTTPS security
  // store: new MongoStore({ mongooseConnection: mongoose.connection })
};

// TODO: Add cors
export const createDefaultHandler = <Data = unknown>(): NextConnect<ServerRequestType, ServerResponseType<ServerSuccessPayload<Data>>> => nc({ onError: handleError }).use(session(sessionConfig));

export const createSuccessPayload = <T>(data: T): ServerSuccessPayload<T> => ({
  data, meta: { success: true }
});
