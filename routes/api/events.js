const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose')

const Event = require('../../models/Event');
const Thread = require('../../models/Thread');
const validateEventInput = require('../../validation/events')
const validatePointOfInterestInput = require('../../validation/point-of-interest')

// GET route for all Event(index)
router.get('/', (req, res) => {
  Event.find()
    .select('-attendees')
    .select('-threads')
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: 'No events found' }))
});

// GET route for an event (show)
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    // Use Populate method to fill up with users and threads when we get to that part.
    .populate({
      path:"attendees",
      model:"User",
      select: 'username'
    })
    .populate({
      path: 'owner',
      select: 'username'
    })
    .populate({
      path: 'threads',
      model: "Thread",
      perDocumentLimit: 5
    })
    .then((event) => res.json(event))
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
router.patch('/:id',
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {
    Event.findById(req.params.id)
    .then(function(event){
      event.set(req.body)
      res.json(event)})
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))

  }
)

/// Point of Interest Routes

// GET route for poi(point of interest inside of an event (embedded index)
router.get('/:id/pois/:poi_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {Event.findById(req.params.id)
  .then( event => {
    let target = ""
    // Find correct Point of Interest
    event.PointsOfInterest.forEach( (poi) => 
      {if (poi.id === req.params.poi_id)
        target = poi;
      }
    );
    // Error Message if id does not match any point of interest
    if(target === ""){return res.json({ noPointofInterestFound: "This event does not have a Point of interest with that Id"})}
    res.json(target)})
  .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
  }
)


// POST route for poi(point of interest) inside of an event (embedded create)
router.post('/:id/pois', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Event.findById(req.params.id)
    .then( event => {
      const { errors, isValid } = validatePointOfInterestInput(req.body);
      // // Check if body is a valid Point of Interest
      if (!isValid) {return res.status(400).json(errors);}
      event.PointsOfInterest.push(req.body);
      event.save()
      res.json(event)})
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
  }
)

// PATCH route for poi(point of interet) inside of an event(embeded put)
router.patch('/:id/pois/:poi_id', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Event.findById(req.params.id)
    .then( event => {
      let targetIndex = ""
      // Find correct index of point of interest
      event.PointsOfInterest.forEach( (poi, index) => 
        {if (poi.id === req.params.poi_id) 
          {
            targetIndex = index;;
          }}
      );
      // Error Message if id does not match any point of interest
      if(targetIndex === ""){return res.json({ noPointofInterestFound: "This event does not have a Point of interest with that ID"})}
      // Check if body is a valid Point of Interest
      const { errors, isValid } = validatePointOfInterestInput(req.body);
      if (!isValid) {return res.status(400).json(errors);}
      // Update correct Point of Interest
      event.PointsOfInterest[targetIndex] = req.body;
      event.save()
      res.json(event)})
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
  }
)

// DELETE route for Point of Interest
router.delete('/:id/pois/:poi_id', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {Event.findById(req.params.id)
  .then( event => {
    let target = ""
    // Find correct Point of Interest
    event.PointsOfInterest.forEach( (poi) => 
      {if (poi.id === req.params.poi_id)
        target = poi;
      }
    );
    // Error Message if id does not match any point of interest
    if(target === ""){return res.json({ noPointofInterestFound: "This event does not have a Point of interest with that ID"})}
    target.remove();
    event.save();
    res.json(event)})
  .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
})

// PATCH route to add a user to the attendes of the Event
router.patch('/:id/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {Event.findById(req.params.id)
  .then( event => { 
    event.attendees.push(req.params.user_id)
    event.save();
    res.json(event)})
  .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
})

// DELETE route to remove user from attendes of the Event 
router.delete('/:id/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {Event.findById(req.params.id)
  .then( event => { 
    let deleteIndex = -1
    // Find Index of User to be deleted
    event.attendees.forEach(function(attendee, index){
      if(attendee.toString() === req.params.user_id){
        deleteIndex = index;
      }
    })
    if(deleteIndex === -1){return res.status(404).json({noAttendeeFound: "This event has no user with this ID"})}
    event.attendees.splice(deleteIndex, 1)
    event.save();
    res.json(event)})
  .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
})


module.exports = router;


