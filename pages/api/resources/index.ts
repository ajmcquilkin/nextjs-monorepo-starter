import * as resourceController from 'controllers/resourceController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchResourceData } from 'types/resource';

const handler = createDefaultHandler()
  .use(useDB)

  .post(async (req, res) => {
    const { content, link } = req.body;

    const createdResource = await resourceController.create({
      content, link
    });

    return res.status(201).json(createSuccessPayload<FetchResourceData>({ resource: createdResource }));
  });

export default handler;
