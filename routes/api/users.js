const express = require('express');
const router = express.Router(); //gets router object
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Event = require('../../models/Event')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserUpdate = require('../../validation/users');
const { route } = require('./events');


//private auth route for accessing user data on the frontend once logged in
router.get('/current', 
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
)

//registration route  
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//login route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
  .populate({
    path:"events",
    model: "Event"
  })
  .then(user => {
    if (!user) {
      errors.username = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        // the user(the payload) is encoded into the jwt. The frontend will decode it
        // to get the user object upon page refresh
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            user
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// GET route for an Indiviudal User
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    User.findById(req.params.id)
    .populate("events")
    .then( user => {res.json(user)})
    .catch(err => res.status(404).json({ noUserFound: "No user found with that ID"}))
  }
),


// PATCH route for User
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid} = validateUserUpdate(req.body);
    if (!isValid){
      return res.status(400).json(errors);
    }
    User.findById(req.params.id)
    .then(user => {
      user.set(req.body)
      res.json(user)})
    .catch(err => res.status(404).json({ noUserFound: "No user found with that ID"}))
  }
)

// DELETE user
router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    User.findById(req.params.id)
    .then(user => {
      user.events.forEach(function(event){
        Event.findById(event.toString()).then(
          function(event){
            let deleteIndex = -1;
            event.attendees.forEach(function(attendee, index)
            {if(attendee.toString() === req.params.id)
              {deleteIndex = index}
            })
            event.attendees.splice(deleteIndex, 1);
            event.save()
          }
        )
      })
      user.delete();
      res.json("User Annihilated")})
    .catch(err => res.status(404).json({ noUserFound: "No user found with that ID"}))
  }
)

module.exports = router;