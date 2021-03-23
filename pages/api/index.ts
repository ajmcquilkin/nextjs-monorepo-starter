import { createDefaultHandler, createSuccessPayload } from 'utils/api';

const handler = createDefaultHandler()
  .get((_req, res) => res.json(createSuccessPayload<{ message: string }>({ message: 'Welcome to the NextJS Monorepo Starter API!' })));

export default handler;
