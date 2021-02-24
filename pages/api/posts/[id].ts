import * as postController from 'controllers/postController';

import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import { DeletePostData, FetchPostData, Post } from 'types/post';

const handler = createDefaultHandler()
  .use(useDB)
  .use(requireUrlParam('id'))

  .get(async (req, res) => {
    const { id } = req.query;
    const foundPost = await postController.read(id as string);
    return res.status(200).json(createSuccessPayload<FetchPostData>({ post: foundPost }));
  })

  .put(async (req, res) => {
    const { id } = req.query;
    const {
      fromName, fromAddress, submitterNetId, recipientGroups,
      type, fullContent, briefContent, url, requestedPublicationDate,
      status, rejectionComment, rejectionReason, featuredImage, eventDate
    }: Post = req.body;

    const updatedPost = await postController.update(id as string, {
      fromName,
      fromAddress,
      submitterNetId,
      type,
      fullContent,
      briefContent,
      url,
      requestedPublicationDate,
      recipientGroups,
      status,
      rejectionComment,
      rejectionReason,
      featuredImage,
      eventDate
    });

    return res.status(200).json(createSuccessPayload<FetchPostData>({ post: updatedPost }));
  })

  .delete(async (req, res) => {
    const { id } = req.query;
    await postController.remove(id as string);
    return res.status(200).json(createSuccessPayload<DeletePostData>({ id: id as string }));
  });

export default handler;
