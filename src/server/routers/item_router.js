import express from 'express';

import { Items } from '../models';
import { requireLogin } from '../authentication';

const router = express();

// find and return all resources
router.route('/')
  // Get all resources
  .get(requireLogin, (req, res) => {
    console.log(req.query);
    Items.find(req.query).then((resources) => res.json(resources))
      .catch((error) => res.status(500).json(error));
  })

  // Create new resource (SECURE)
  .post(requireLogin, (req, res) => {
    const newItem = new Items();
    newItem.submitter_netid = req.user.netid;
    newItem.from_name = req.user.full_name;
    newItem.from_address = req.user.email;

    newItem.brief_content = req.body.brief_content;
    newItem.full_content = req.body.full_content;
    newItem.requested_publication_date = req.body.requested_publication_date;
    newItem.recipient_groups = req.body.recipient_groups;

    newItem.date_item_created = Date.now();

    newItem.save()
      .then((savedItem) => res.json(savedItem)).catch((error) => res.status(500).json(error));
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
        if (error.message && error.message.startsWith('Resource with id:')) {
          return res.status(404).json(error);
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
        if (error.message.startsWith('Resource with id:')) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
      });
  });

export default router;
