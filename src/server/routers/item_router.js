/* eslint-disable camelcase */
import express from 'express';
import bodyParser from 'body-parser';

import { Items } from '../models';
import { requireLogin } from '../authentication';

const router = express();

// TODO: Move middleware attachment to test file
if (process.env.NODE_ENV === 'test') {
  // enable json message body for posting data to router
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
}

// find and return all resources
router.route('/')
  // Get all resources
  .get((req, res) => {
    Items.find(req.query).then((resources) => res.json(resources))
      .catch((error) => res.status(500).json(error));
  })

  // Create new resource (SECURE)
  .post(requireLogin, (req, res) => {
    const {
      brief_content, full_content, requested_publication_date, recipient_groups
    } = req.body;

    if (!brief_content) { return res.status(400).json({ message: 'Missing required "brief_content" field' }); }
    if (!full_content) { return res.status(400).json({ message: 'Missing required "full_content" field' }); }
    if (!recipient_groups) { return res.status(400).json({ message: 'Missing required "recipient_groups" field' }); }
    if (!requested_publication_date) { return res.status(400).json({ message: 'Missing required "requested_publication_date" field' }); }

    const newItem = new Items();

    newItem.submitter_netid = req.session.info.netid;
    newItem.from_name = req.session.info.name;
    newItem.from_address = req.session.cas_user;

    newItem.brief_content = brief_content;
    newItem.full_content = full_content;
    newItem.requested_publication_date = requested_publication_date;
    newItem.recipient_groups = recipient_groups;

    newItem.date_item_created = Date.now();
    newItem.save()
      .then((savedItem) => res.status(201).json(savedItem))
      .catch((error) => res.status(500).json(error));
  })

  // Delete all resources (SECURE, TESTING ONLY)
  .delete(requireLogin, (req, res) => {
    Items.deleteMany({ })
      .then(() => res.json({ message: 'Successfully deleted all resources.' }))
      .catch((error) => res.status(500).json(error));
  });

router.route('/:id')
  // Get resource by id
  .get((req, res) => {
    Items.findById(req.params.id)
      .then((resource) => res.json(resource))
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find item with given id" });
        }
        return res.status(500).json(error);
      });
  })

  .put(requireLogin, (req, res) => {
    // TODO check role + ownership
    Items.findById(req.params.id)
      .then(() => {
        Items.updateOne({ _id: req.params.id }, req.body).then(() => {
          Items.findById(req.params.id).then((found) => res.json(found));
        });
      })
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find item with given id" });
        }
        return res.status(500).json(error);
      });
  })
  .delete(requireLogin, (req, res) => {
    Items.deleteOne({ _id: req.params.id })
      .then(() => res.json({ message: `Item with id: ${req.params.id} was successfully deleted` }))
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find item with given id" });
        }
        return res.json(error);
      });
  });

export default router;
