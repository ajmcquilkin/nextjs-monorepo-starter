import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { casInstance } from 'utils/auth';
import { ServerSession } from 'types/server';

const handler = createDefaultHandler<ServerSession>()
  .use(casInstance.bounce_redirect)
  .get((req, res) => res.status(200).json(createSuccessPayload<ServerSession>(req.session)));

export default handler;
