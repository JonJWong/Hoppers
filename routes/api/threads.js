const express = require('express');
const router = express.Router();
const passport = require('passport');
const Thread = require('../../models/Thread');
const Event = require('../../models/Event');
const validateThreadInput = require('../../validation/threads');
const validateCommentInput = require('../../validation/comments');

// Route to get all Threads from an event
router.get('/events/:event_id', (req, res) => {
  Thread.find({ event: req.params.event_id })
    .then(thread => res.json(thread))
    .catch(err => res.status(404).json({ nothreadfound: 'No thread found from that event' }))
});

// Route to get a Thread by ID
router.get('/:id', (req, res) => {
  Thread.findById(req.params.id)
    .then(thread => res.json(thread))
    .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
});

// POST to create a thread
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateThreadInput(req.body);
    if (!isValid) { return res.status(400).json(errors) }

    const newThread = new Thread({
      name: req.body.name,
      event: req.body.eventId,
    })

    newThread.save();
    // Add thread to correct event.
    Event.findById(req.body.eventId)
      .then(currentEvent => {
        currentEvent.threads.push(newThread)
        currentEvent.save().then(event => res.json(newThread))
      })
  });

// DELETE a thread
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(function(thread){
        // Delete thread out of Event
        console.log(thread.event.toString())
        Event.findById(thread.event.toString())
        .then(currentEvent => {
        let deleteIndex = -1
        // Find index of thread
        currentEvent.threads.forEach(function(thread, index){
          if(thread.toString() === req.params.id){
            deleteIndex = index;
          }
        }) 
        console.log(deleteIndex)
        currentEvent.threads.splice(deleteIndex, 1) 
        currentEvent.save()
        })
        thread.delete()
        res.json(thread)
      })
      .catch(err => res.status(404).json({ error: 'Error in Deletion' }))
    }
)

// PATCH to update a Thread
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

// POST a Comment
router.post('/:id/comments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Thread.findById(req.params.id)
      .then(thread => {
        const { errors, isValid } = validateCommentInput(req.body);
        if (!isValid) {return res.status(400).json(errors)}
        let comment = req.body
        // comment.time = Math.floor(Date.now() / 1000)
        comment.time = new Date().toISOString()
        thread.comments.push(comment)
        thread.save().then(thread => res.json(thread));
      })
      .catch(err => res.status(404).json({ nothreadfound: 'No thread found with that ID' }))
  })

// Patch a Comment
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

// Delete a Comment 
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


