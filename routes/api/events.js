const express = require('express');
const router = express.Router();
const passport = require('passport');

const Event = require('../../models/Event');
// const validateEventInput = require('../../validation/events')


router.get('/', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: 'No events found' }))
});

router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => restatus(404).json({ noeventfound: 'No event found with that ID' }))
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEventInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newEvent = new Event({
      name: req.body.name,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      user: req.user.id,
    })

    newEvent.save().then(event => res.json(event));
  });

router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

  Event.findById(req.params.id)
    .then(event => event.delete())
    .then(res.json("Event deleted"))
})

// router.put('/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const currentEvent = Event.findById(req.params.id)

//     currentEvent.name = req.body.name
//     currentEvent.startTime = req.body.startTime
//     currentEvent.endTime = req.body.endTime

//     currentEvent.update().then(event => res.json(event));
//   });

module.exports = router;


