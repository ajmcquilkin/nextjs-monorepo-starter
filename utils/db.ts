import { NextHandler } from 'next-connect';
import mongoose from 'mongoose';

import { ServerRequestType, ServerResponseType } from 'types/server';

export const dbConnect = async (): Promise<typeof mongoose | void> => {
  if (mongoose.connection.readyState < 1) {
    return mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }
};

export const useDB = async (_req: ServerRequestType, _res: ServerResponseType, next: NextHandler): Promise<void> => {
  await dbConnect();
  next();
};
