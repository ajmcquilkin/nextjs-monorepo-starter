import express from 'express';

import { Resources } from '../models';
import { requireAuth } from '../authentication';

const router = express();

// find and return all resources
router.route('/')
  // Get all resources
  .get((req, res) => {
    console.log(req.session);
    return Resources.find({})
      .then((resources) => res.json(resources))
      .catch((error) => res.status(500).json(error));
  })

  // Create new resource (SECURE)
  .post(requireAuth, (req, res) => {
    const resource = new Resources();

    resource.title = req.body.title;
    resource.description = req.body.description;
    resource.value = req.body.value;
    resource.date_account_created = Date.now();

    resource.save()
      .then((savedResource) => res.json(savedResource)).catch((error) => res.status(500).json(error));
  })

  // Delete all resources (SECURE, TESTING ONLY)
  .delete(requireAuth, (req, res) => {
    Resources.deleteMany({ })
      .then(() => res.json({ message: 'Successfully deleted all resources.' }))
      .catch((error) => res.status(500).json(error));
  });

router.route('/:id')

  // Get resource by id
  .get((req, res) => {
    Resources.findById(req.params.id)
      .then((resource) => res.json(resource))
      .catch((error) => {
        if (error.message && error.message.startsWith('Resource with id:')) {
          return res.status(404).json(error);
        }
        return res.status(500).json(error);
      });
  })

  // Update resource by id (SECURE)
  .put(requireAuth, (req, res) => {
    Resources.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        // Fetch resource object and send
        Resources.findById(req.params.id)
          .then((resource) => res.json(resource))
          .catch((error) => {
            if (error.message.startsWith('Resource with id:')) {
              return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: error.message });
          });
      })
      .catch((error) => res.status(500).json(error));
  })

  // Delete resource by id, SECURE
  .delete(requireAuth, (req, res) => {
    Resources.deleteOne({ _id: req.params.id })
      .then(() => res.json({ message: `Resource with id: ${req.params.id} was successfully deleted` }))
      .catch((error) => res.json(error));
  });

export default router;
