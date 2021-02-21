import { createDefaultHandler, createSuccessPayload } from 'utils/api';

const handler = createDefaultHandler()
  .get((_req, res) => res.json(createSuccessPayload<{ message: string }>({ message: 'Welcome to the ITC Vox API!' })));

export default handler;
