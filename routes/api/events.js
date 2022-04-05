const express = require('express');
const router = express.Router();
const passport = require('passport');

const Event = require('../../models/Event');
const Thread = require('../../models/Thread');
const validateEventInput = require('../../validation/events')
const validatePointOfInterestInput = require('../../validation/point-of-interest')

// GET route for all Event(index)
router.get('/', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: 'No events found' }))
});

// GET route for an event (show)
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    // Use Populate method to fill up with users and threads when we get to that part.
    .then(event => res.json(event))
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
});

// POST route for an event(create)
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      owner: req.user.id,
    })

    newEvent.save().then(event => res.json(event));
  });

// DELETE route for an event(destroy)
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

  Event.findById(req.params.id)
    .then(event => event.delete())
    .then(res.json("Event deleted"))
})

// Update route for an Event
router.put('/:id',
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {
    Event.findById(req.params.id)
    .then(function(event){
      event.set(req.body)
      res.json(event)})
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))

  }
)
// POST route for poi(point of interest) inside of an event (embedded create)
router.post('/:id/poi', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Event.findById(req.params.id)
    .then( event => {
      const { errors, isValid } = validatePointOfInterestInput(req.body);
      // // Check if body is a valid Point of Interest
      if (!isValid) { return res.status(400).json(errors);}
      event.PointsOfInterest.push(req.body);
      event.save()
      res.json(event)})
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
  }
)


module.exports = router;


