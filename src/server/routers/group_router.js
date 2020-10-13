import express from 'express';

import { Groups } from '../models';
import { requireLogin } from '../authentication';

const router = express();

// find and return all resources
router.route('/')

  // Get all resources
  .get((req, res) => {
    Groups.find({}).then((resources) => res.status(200).json(resources))
      .catch((error) => res.status(500).json({ message: error.message }));
  })

  // Create new Group (SECURE)
  .post(requireLogin, (req, res) => {
    const newgroup = new Groups();

    newgroup.name = req.body.name;
    newgroup.description = req.body.description;
    newgroup.categories = req.body.categories;

    newgroup.save()
      .then((saved) => res.status(200).json(saved))
      .catch((error) => res.status(500).json({ message: error.message }));
  })

  // Delete all resources (SECURE, TESTING ONLY)
  .delete(requireLogin, (req, res) => {
    Groups.deleteMany({ })
      .then(() => res.status(200).json({ message: 'Successfully deleted all resources.' }))
      .catch((error) => res.status(500).json({ message: error.message }));
  });

router.route('/:id')

  // Get resource by id
  .get((req, res) => {
    Groups.findById(req.params.id)
      .then((group) => res.status(200).json(group))
      .catch((error) => {
        if (error.message && error.message.startsWith('Resource with id:')) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
      });
  })

  // Update resource by id (SECURE)
  .put(requireLogin, (req, res) => {
    Groups.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        // Fetch resource object and send
        Groups.findById(req.params.id)
          .then((resource) => res.status(200).json(resource))
          .catch((error) => {
            if (error.message.startsWith('Resource with id:')) {
              return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: error.message });
          });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })

  // Delete resource by id, SECURE
  .delete(requireLogin, (req, res) => {
    Groups.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: `Resource with id: ${req.params.id} was successfully deleted` }))
      .catch((error) => res.json({ message: error.message }));
  });

export default router;
