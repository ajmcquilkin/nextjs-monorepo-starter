import nc, { NextConnect } from 'next-connect';
import session from 'express-session';

import { handleError } from 'controllers/errorController';
import { ServerRequestType, ServerResponseType, ServerSuccessPayload } from 'types/server';

// ! DO NOT use MemoryStore in production
// TODO: Initialize MongoStore for this token
const sessionConfig = {
  // secret: process.env.SESSION_SECRET as string,
  secret: 'skjn&Yuibn*Dh89ash9da s8989dU(* D&8^&ASD%^SFDtvSD&78G&)D*&B',
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
