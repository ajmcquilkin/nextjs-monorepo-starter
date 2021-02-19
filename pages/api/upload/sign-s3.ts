import * as uploadController from 'controllers/uploadController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';

import { ImageUploadPayload } from 'types/upload';

const handler = createDefaultHandler()
  .get(async (req, res) => {
    const fileName = req.query['file-name'] as string;
    const fileType = req.query['file-type'] as string;
    const result = await uploadController.signS3(fileName, fileType);
    return res.status(201).json(createSuccessPayload<ImageUploadPayload>(result));
  });

export default handler;
