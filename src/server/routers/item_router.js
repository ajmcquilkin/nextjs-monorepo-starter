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

router.get('/submissions', requireLogin, (req, res) => {
  const { netid } = req.session.info;
  Items.find({ submitter_netid: netid }).then((items) => res.status(200).json(items))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// find and return all items
router.route('/')
  // Get all items
  .get((req, res) => {
    Items.find(req.query).then((items) => res.status(200).json(items))
      .catch((error) => res.status(500).json({ message: error.message }));
  })

  // Create new item (SECURE)
  .post(requireLogin, (req, res) => {
    const {
      brief_content, full_content, requested_publication_date, recipient_groups, type, url
    } = req.body;

    if (!brief_content) { return res.status(400).json({ message: 'Missing required "brief_content" field' }); }
    if (!full_content) { return res.status(400).json({ message: 'Missing required "full_content" field' }); }
    if (!recipient_groups) { return res.status(400).json({ message: 'Missing required "recipient_groups" field' }); }
    if (!requested_publication_date) { return res.status(400).json({ message: 'Missing required "requested_publication_date" field' }); }

    const newItem = new Items();

    // Provided by session
    newItem.submitter_netid = req.session.info.netid;
    newItem.from_name = req.session.info.name;
    newItem.from_address = req.session.cas_user;

    // Provided by user (required)
    newItem.brief_content = brief_content;
    newItem.full_content = full_content;
    newItem.requested_publication_date = requested_publication_date;
    newItem.recipient_groups = recipient_groups;
    newItem.type = type;
    newItem.url = url;

    newItem.date_item_created = Date.now();
    newItem.save()
      .then((savedItem) => res.status(201).json(savedItem))
      .catch((error) => res.status(500).json({ message: error.message }));
  })

  // Delete all items (SECURE, TESTING ONLY)
  .delete(requireLogin, (req, res) => {
    Items.deleteMany({ })
      .then(() => res.json({ message: 'Successfully deleted all items.' }))
      .catch((error) => res.status(500).json({ message: error.message }));
  });

router.route('/:id')
  // Get item by id
  .get((req, res) => {
    Items.findById(req.params.id)
      .then((item) => res.json(item))
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find item with given id" });
        }
        return res.status(500).json({ message: error.message });
      });
  })

  .put(requireLogin, (req, res) => {
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
        return res.status(500).json({ message: error.message });
      });
  })
  .delete(requireLogin, (req, res) => {
    Items.deleteOne({ _id: req.params.id })
      .then(() => res.json({ message: `Item with id: ${req.params.id} was successfully deleted` }))
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find item with given id" });
        }
        return res.json({ message: error.message });
      });
  });

export default router;
