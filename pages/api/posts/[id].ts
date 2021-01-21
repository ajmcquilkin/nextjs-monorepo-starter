import * as postController from 'controllers/postController';

import { casInstance } from 'utils/auth';
import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import { DeletePostData, FetchPostData, Post } from 'types/post';

const handler = createDefaultHandler()
  .use(useDB)
  .use(requireUrlParam('id'))
  .use(casInstance.bounce)

  .get(async (req, res) => {
    const { id } = req.query;
    const foundPost = await postController.read(id as string);
    return res.status(200).json(createSuccessPayload<FetchPostData>(foundPost));
  })

  .put(async (req, res) => {
    const { id } = req.query;
    const {
      fromName, fromAddress, submitterNetId,
      type, fullContent, briefContent, url, publishOrder, requestedPublicationDate,
      status, reviewComment
    }: Post = req.body;

    const updatedPost = await postController.update(id as string, {
      fromName,
      fromAddress,
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
