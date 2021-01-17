import { NextHandler } from 'next-connect';
import mongoose from 'mongoose';

import { MissingConfigError } from 'errors';
import { ServerRequestType, ServerResponseType } from 'types/server';

export const dbConnectionOptions: Partial<mongoose.ConnectOptions> = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

export const dbConnect = async (): Promise<typeof mongoose | void> => {
  if (!process.env.MONGODB_URI) throw new MissingConfigError('MONGODB_URI');
  const mongodbUri = process.env.MONGODB_URI as string;

  if (mongoose.connection.readyState < 1) {
    return mongoose.connect(mongodbUri, dbConnectionOptions);
  }
};

export const useDB = async (_req: ServerRequestType, _res: ServerResponseType, next: NextHandler): Promise<void> => {
  await dbConnect();
  next();
};
