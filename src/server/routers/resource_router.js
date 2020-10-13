import express from 'express';
import bodyParser from 'body-parser';

import { Resources } from '../models';
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
  .get((req, res) => Resources.find({})
    .then((resources) => res.json(resources))
    .catch((error) => res.status(500).json(error)))

  // Create new resource (SECURE)
  .post(requireLogin, (req, res) => {
    const resource = new Resources();

    const {
      title, description, value
    } = req.body;

    if (!title) { return res.status(400).json({ message: 'Missing required "title" field' }); }
    if (!description) { return res.status(400).json({ message: 'Missing required "description" field' }); }
    if (!value) { return res.status(400).json({ message: 'Missing required "value" field' }); }

    resource.title = title;
    resource.description = description;
    resource.value = value;
    resource.date_account_created = Date.now();

    resource.save()
      .then((savedResource) => res.status(201).json(savedResource))
      .catch((error) => res.status(500).json(error));
  })

  // Delete all resources (SECURE, TESTING ONLY)
  .delete(requireLogin, (req, res) => {
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
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find resource with given id" });
        }
        return res.status(500).json(error);
      });
  })

  // Update resource by id (SECURE)
  .put(requireLogin, (req, res) => {
    Resources.findOneAndUpdate(
      { _id: req.params.id }, req.body,
      { useFindAndModify: false, new: true }
    )
      .then((resource) => res.json(resource))
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find resource with given id" });
        }
        return res.status(500).json({ message: error.message });
      });
  })

  // Delete resource by id, SECURE
  .delete(requireLogin, (req, res) => {
    Resources.deleteOne({ _id: req.params.id })
      .then(() => res.json({ message: `Resource with id: ${req.params.id} was successfully deleted` }))
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ message: "Couldn't find resource with given id" });
        }
        return res.json(error);
      });
  });

export default router;
