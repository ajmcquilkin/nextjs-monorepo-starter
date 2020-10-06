import express from 'express';

import { Groups } from '../models';
import { requireAuth } from '../authentication';

const router = express();

// find and return all resources
router.route('/')

  // Get all resources
  .get((req, res) => {
    Groups.find({}).then((resources) => {
      return res.json(resources);
    }).catch((error) => {
      return res.status(500).json(error);
    });
  })

  // Create new Group (SECURE)
  .post(requireAuth, (req, res) => {
    const newgroup = new Groups();

    newgroup.name = req.body.name;
    newgroup.description = req.body.description;
    newgroup.categories = req.body.categories;

    newgroup.save()
      .then((saved) => {
        return res.json(saved);
      }).catch((error) => {
        return res.status(500).json(error);
      });
  })

  // Delete all resources (SECURE, TESTING ONLY)
  .delete(requireAuth, (req, res) => {
    Groups.deleteMany({ })
      .then(() => {
        return res.json({ message: 'Successfully deleted all resources.' });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  });

router.route('/:id')

  // Get resource by id
  .get((req, res) => {
    Groups.findById(req.params.id)
      .then((group) => {
        return res.json(group);
      })
      .catch((error) => {
        if (error.message && error.message.startsWith('Resource with id:')) {
          return res.status(404).json(error);
        } else {
          return res.status(500).json(error);
        }
      });
  })

  // Update resource by id (SECURE)
  .put(requireAuth, (req, res) => {
    Groups.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        // Fetch resource object and send
        Groups.findById(req.params.id)
          .then((resource) => {
            return res.json(resource);
          })
          .catch((error) => {
            if (error.message.startsWith('Resource with id:')) {
              return res.status(404).json({ message: error.message });
            } else {
              return res.status(500).json({ message: error.message });
            }
          });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  })

  // Delete resource by id, SECURE
  .delete(requireAuth, (req, res) => {
    Groups.deleteOne({ _id: req.params.id })
      .then(() => {
        return res.json({ message: `Resource with id: ${req.params.id} was successfully deleted` });
      })
      .catch((error) => {
        return res.json(error);
      });
  });

export default router;
