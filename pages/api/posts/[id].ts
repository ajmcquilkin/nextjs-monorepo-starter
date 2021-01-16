import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload } from 'utils/api';
import { useDB } from 'utils/db';

import { DeletePostData, FetchPostData } from 'types/post';
import { casInstance } from 'utils/auth';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  .get(async (req, res) => {
    const { id } = req.query;
    const foundPost = await postController.read(id as string);
    return res.status(200).json(createSuccessPayload<FetchPostData>(foundPost));
  })

  .put(async (req, res) => {
    const { id } = req.query;
    const {
      fromName, fromAddress, subject, submitterNetId,
      type, fullContent, briefContent, url, publishOrder, requestedPublicationDate,
      status, reviewComment
    } = req.body;

    const updatedPost = await postController.update(id as string, {
      fromName,
      fromAddress,
      subject,
      submitterNetId,
      type,
      fullContent,
      briefContent,
      url,
      publishOrder,
      requestedPublicationDate,
      status,
      reviewComment
    });

    return res.status(200).json(createSuccessPayload<FetchPostData>(updatedPost));
  })

  .delete(async (req, res) => {
    const { id } = req.query;
    await postController.remove(id as string);
    return res.status(200).json(createSuccessPayload<DeletePostData>({ id: id as string }));
  });

export default handler;
