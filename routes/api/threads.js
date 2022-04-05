const express = require('express');
const router = express.Router();
const passport = require('passport');
const Thread = require('../../models/Thread');
const Event = require('../../models/Event');
const validateThreadInput = require('../../validation/threads');
const validateCommentInput = require('../../validation/comments');

router.get('/event/:event_id', (req, res) => {
  Thread.find({ event: req.params.event_id })
    .then(thread => res.json(thread))
    .catch(err => res.status(404).json({ nothreadfound: 'No thread found from that event' }))
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
    if (!isValid) { return res.status(400).json(errors) }

    const newThread = new Thread({
      name: req.body.name,
      event: req.body.eventId,
    })

    Event.findById(req.body.eventId)
      .then(currentEvent => {
        currentEvent.threads.push(newThread)
        currentEvent.save().then(event => res.json(event))
      })
  });

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(thread => thread.delete())
      .then(res.json("Thread deleted"))
  })

router.patch('/:id', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    
    Thread.findById(req.params.id)
      .then(thread => {
        const { errors, isValid } = validateThreadInput(req.body);
        if (!isValid) { return res.status(400).json(errors) }

        thread.name = req.body.name
        thread.save().then(thread => res.json(thread));
      })
      .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
})

router.post('/:id/comments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(thread => {
        
        const { errors, isValid } = validateCommentInput(req.body);
        if (!isValid) {return res.status(400).json(errors)}

        thread.comments.push(req.body)
        thread.save().then(thread => res.json(thread));
      })
      .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
  })

router.patch('/:id/comments/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(thread => {
        const { errors, isValid } = validateCommentInput(req.body);
        if (!isValid) { return res.status(400).json(errors) }

        let commentIndex = thread.comments.findIndex(comment => { return comment.id === req.params.comment_id})
        thread.comments[commentIndex] = req.body;
        thread.save().then(thread => res.json(thread));
      })
      .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
  })

router.delete('/:id/comments/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(thread => {

        let commentIndex = thread.comments.findIndex(comment => { return comment.id === req.params.comment_id })
        thread.comments.splice(commentIndex, 1);
        thread.save().then(thread => res.json(thread));
      })
      .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
  })

module.exports = router;


