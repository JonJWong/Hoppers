const express = require('express');
const router = express.Router();
const passport = require('passport');

const Thread = require('../../models/Thread');
const validateThreadInput = require('../../validation/threads');

router.get('/event/:event_id', (req, res) => {
  Thread.find({ event: req.params.event_id })
    .then(thread => res.json(thread))
    .catch(err => res.status(404).json({ nothreadfound: 'No thread found from that event' }))
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
      event: req.body.eventId,
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


