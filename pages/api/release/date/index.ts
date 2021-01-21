import * as releaseController from 'controllers/releaseController';

import { casInstance } from 'utils/auth';
import { createDefaultHandler, createSuccessPayload, requireUrlParam } from 'utils/api';
import { useDB } from 'utils/db';

import { FetchReleaseData, Release, DeleteReleaseData } from 'types/release';

const handler = createDefaultHandler()
  .use(useDB)
  .use(casInstance.bounce)

  // fetches a release by date attribute
  .get(async (req, res) => {
    const date = req.query.date ? (Number(req.query.date)) : Date.now();
    const foundRelease = await releaseController.fetchReleaseByDate(date);
    if (!foundRelease) {
      const news = [];
      const announcements = [];
      const events = [];
      const newRelease = await releaseController.create({
        date: Date.now(), // TODO: Switch the date around
        subject: '',
        headerImage: '',
        quoteOfDay: '',
        quotedContext: '',
        featuredPost: null,
        news,
        announcements,
        events
      });
      return res.status(201).json(createSuccessPayload<FetchReleaseData>(newRelease));
    }
    return res.status(200).json(createSuccessPayload<FetchReleaseData>(foundRelease));
  });

export default handler;
