import express from 'express';

import { Groups } from '../models';
import { requireLogin } from '../authentication';

const router = express();

router.route('/')

  .get((req, res) => {
    Groups.find({}).then((groups) => res.status(200).json(groups))
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

  // Delete all groups (SECURE, TESTING ONLY)
  .delete(requireLogin, (req, res) => {
    Groups.deleteMany({ })
      .then(() => res.status(200).json({ message: 'Successfully deleted all groups.' }))
      .catch((error) => res.status(500).json({ message: error.message }));
  });

router.route('/:id')

  // Get group by id
  .get((req, res) => {
    Groups.findById(req.params.id)
      .then((group) => res.status(200).json(group))
      .catch((error) => {
        if (error.message && error.message.startsWith('Group with id:')) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
      });
  })

  // Update group by id (SECURE)
  .put(requireLogin, (req, res) => {
    Groups.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        // Fetch group object and send
        Groups.findById(req.params.id)
          .then((group) => res.status(200).json(group))
          .catch((error) => {
            if (error.message.startsWith('Group with id:')) {
              return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: error.message });
          });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })

  // Delete group by id, SECURE
  .delete(requireLogin, (req, res) => {
    Groups.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: `Group with id: ${req.params.id} was successfully deleted` }))
      .catch((error) => res.json({ message: error.message }));
  });

export default router;
