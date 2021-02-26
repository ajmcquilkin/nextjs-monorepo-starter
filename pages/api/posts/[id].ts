import * as postController from 'controllers/postController';

import { ForbiddenResourceError } from 'errors';

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
    const { session: { info } } = req;
    if (!info.isStaff && !info.isReviewer) { throw new ForbiddenResourceError(); }

    const { id } = req.query;
    const foundPost = await postController.read(id as string);
    if (foundPost.submitterNetId.toLowerCase() !== info.netId?.toLowerCase()) { throw new ForbiddenResourceError(); }

    const submitterNetId = info.netId;

    const {
      fromName, fromAddress, recipientGroups,
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
    const { session: { info } } = req;
    if (!info.isStaff && !info.isReviewer) { throw new ForbiddenResourceError(); }

    const { id } = req.query;
    const foundPost = await postController.read(id as string);
    if (foundPost.submitterNetId !== info.netId) { throw new ForbiddenResourceError(); }

    await postController.remove(id as string);
    return res.status(200).json(createSuccessPayload<DeletePostData>({ id: id as string }));
  });

export default handler;
