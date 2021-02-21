import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { ServerSession } from 'types/server';

const handler = createDefaultHandler<ServerSession>()
  .get((req, res) => res.status(200).json(createSuccessPayload<ServerSession>(req.session)));

export default handler;
