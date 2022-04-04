const express = require('express');
const router = express.Router();
const passport = require('passport');

const Thread = require('../../models/Thread');
const validateThreadInput = require('../../validation/thread')

router.get('/', (req, res) => {
  Thread.find()
    .then(threads => res.json(threads))
    .catch(err => res.status(404).json({ nothreadsfound: 'No threads found' }))
});

router.get('/:id', (req, res) => {
  Thread.findById(req.params.id)
    .then(thread => res.json(thread))
    .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateThreadInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newThread = new Thread({
      name: req.body.name,
    })

    newThread.save().then(thread => res.json(thread));
  });

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(thread => thread.delete())
      .then(res.json("Thread deleted"))
  })

module.exports = router;


