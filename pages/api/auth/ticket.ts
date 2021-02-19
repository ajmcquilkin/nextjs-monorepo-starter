import { createDefaultHandler } from 'utils/api';

const handler = createDefaultHandler()
  .get((_req, res) => res.redirect(`${__APP_URL__}/`).end());

export default handler;
