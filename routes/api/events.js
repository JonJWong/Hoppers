const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose')
const User = require('../../models/User')
const Event = require('../../models/Event');
const Thread = require('../../models/Thread');
const validateEventInput = require('../../validation/events');
const validatePointOfInterestInput = require('../../validation/point-of-interest');

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
      path: 'attendees',
      model: 'User',
      select: 'username'
    })
    .populate({
      path: 'owner',
      select: 'username'
    })
    .populate({
      path: 'threads',
      model: "Thread",
    })
    .then((event) => res.json(event))
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
});

// POST route for an event(create)
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
    let fullErrors = {}
    if (!isValid) {
      // Add Non-Poi errors to the error response
      fullErrors = errors;
      // Return earlyf if no Poi's
      if(req.body.PointsOfInterest.length === 0) {return res.status(400).json(fullErrors)}
    }

    // Create new Event
    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      owner: req.user.id,
    })

    // Use start and end times of new Event to Make sure Pois are properly timed
    let startTime = newEvent.startTime
    let endTime = newEvent.endTime
    req.body.PointsOfInterest.forEach((poi, index) => {
       // // Check if it is a valid Point of Interest and is not null
      if(poi === null){return}
      const { errors, isValid } = validatePointOfInterestInput(poi, index,startTime, endTime);
        if (!isValid) { 
          return fullErrors[errors.index + 1] = (errors.index + 1)}
        if (isValid) {newEvent.PointsOfInterest.push(poi)};
    })
    // Return Errors if there are any
    if(Object.values(fullErrors).length > 0){return res.status(400).json(fullErrors)}
    
    // Add user id into attendes
    newEvent.attendees.push(req.user.id)
    newEvent.save().then(function(event){
      // Add event to user events
      User.findById(req.user.id).then( function(user){
        user.events.push(event)
        user.save();
      })
      res.json(event)})
    ;
  });

// DELETE route for an event(destroy)
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

  Event.findById(req.params.id)
    .then(function(event) {
      // Eliminate event from user's attending
      event.attendees.forEach(attendee => {
      User.findById(attendee.toString()).then(
      user => {
        let eventdeleteIndex = - 1
        // Find index of Event to be deleted from Users
        user.events.forEach(function (event,index){
          if(event.toString() === req.params.id){
            eventdeleteIndex = index;
          }
        })
        user.events.splice(eventdeleteIndex, 1)
        user.save();
      })})
      // Delete threads belonging to event
      if (event.threads.length !== 0) {
        event.threads.forEach(thread => {
          Thread.findById(thread.toString())
            .then(thread => thread.delete())
        })
      }
      
    // Delete Event
      event.delete()    
    }
    )
    .then(res.json("Event deleted"))
})

// Update route for an Event
router.patch('/:id',
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {
    Event.findById(req.params.id)
      .then(event => {
        const { errors, isValid } = validateEventInput(req.body);
        let fullErrors = {}
        if (!isValid) { 
          // Add Non-Poi errors to the error response
          fullErrors = errors;
          // Return early if no Poi's
          if(req.body.PointsOfInterest.length === 0){return res.status(400).json(fullErrors)}
        }

        event.name = req.body.name
        event.description = req.body.description
        event.startTime = req.body.startTime
        event.endTime = req.body.endTime
        // clear Pois to get rid of nulls
        event.PointsOfInterest = []

        req.body.PointsOfInterest.forEach((poi, index) => {
        // // Check if it is a valid Point of Interest and is not null
          if(poi === null){return}
          const { errors, isValid } = validatePointOfInterestInput(poi, index);
            if (!isValid) { 
              return fullErrors[errors.index + 1] = (errors.index + 1)}
            if(isValid){event.PointsOfInterest.push(poi);}
        })
        // Return Errors if there are any
        if(Object.values(fullErrors).length > 0){return res.status(400).json(fullErrors)}
        // Save Event if no errors
        event.save().then(event => res.json(event));
      })
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
  }
)

/// Point of Interest Routes

// GET route for poi(point of interest) inside of an event 
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


// POST route for poi(point of interest) inside of an event 
router.post('/:id/pois', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Event.findById(req.params.id)
    .then( event => {
      const { errors, isValid } = validatePointOfInterestInput(req.body);
      // // Check if body is a valid Point of Interest
      if (!isValid) {return res.status(400).json(errors);}
      let poi = req.body
      poi.location = {lng: req.body.longitude, lat: req.body.latitude}
      event.PointsOfInterest.push(poi);
      event.save()
      res.json(event)})
    .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
  }
)

// PATCH route for poi(point of interest) inside of an event
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
      // Update correct Point of Interest and add longitude and latitude to location
      let poi = req.body
      poi.location = {lng: req.body.longitude, lat: req.body.latitude}
      event.PointsOfInterest[targetIndex] = poi;
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


//// Routes to add/delete user from event

// PATCH route to add a user to the attendes of the Event
router.patch('/:id/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {Event.findById(req.params.id)
  .then( event => { 
    event.attendees.push(req.params.user_id)
    event.save();
    // Push Event into user
    User.findById(req.params.user_id)
    .then( user => {
      user.events.push(req.params.id);
      user.save();
    })
    res.json(event);
  })
  .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
})

// DELETE route to remove user from attendes of the event 
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
    // Delete User from Attendies
    if(deleteIndex === -1){return res.status(404).json({noAttendeeFound: "This event has no user with this ID"})}
    event.attendees.splice(deleteIndex, 1)
    event.save();
    // Delete Event from Users Event List
    User.findById(req.params.user_id).then(
      user => {
        let eventdeleteIndex = - 1
        // Find index of Event to be deleted from Users
        user.events.forEach(function (event,index){
          if(event.toString() === req.params.id){
            eventdeleteIndex = index;
          }
        })
        user.events.splice(eventdeleteIndex, 1)
        user.save();
      }
    )
    res.json(event)})
  .catch(err => res.status(404).json({ noeventfound: 'No event found with that ID' }))
})


module.exports = router;


