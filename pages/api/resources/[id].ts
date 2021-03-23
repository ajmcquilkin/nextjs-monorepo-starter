import * as resourceController from 'controllers/resourceController';

import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchResourceData, DeleteResourceData } from 'types/resource';

const handler = createDefaultHandler()
  .use(useDB)
  .use(requireUrlParam('id'))

  // TODO: validate return fields on this endpoint with document vs JSON
  .get(async (req, res) => {
    const { id } = req.query;
    const foundResource = await resourceController.read(id as string);
    return res.status(200).json(createSuccessPayload<FetchResourceData>({ resource: foundResource }));
  })

  .patch(async (req, res) => {
    const { id } = req.query;

    const { content, link } = req.body;
    const updatedResource = await resourceController.update(id as string, {
      content, link
    });

    return res.status(200).json(createSuccessPayload<FetchResourceData>({ resource: updatedResource }));
  })

  .delete(async (req, res) => {
    const { id } = req.query;
    await resourceController.remove(id as string);
    return res.status(200).json(createSuccessPayload<DeleteResourceData>({ id: id as string }));
  });

export default handler;
