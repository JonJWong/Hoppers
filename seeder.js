// require ("./models/User.js")
const seeder = require("mongoose-seed")
const db = require('./config/keys').mongoURI;


seeder.connect(db, function(){
  // Load Models
  seeder.loadModels(["./models/User.js"]);
  // Populate Models
  seeder.clearModels(["User"], function() {
  seeder.populateModels(data, function(err, done) {
    if(err){
      // Return Error Message
      return console.log("seeding error", err)
    }
    if(done){
      // Return Success Message
      return console.log("seeding done", done);
    }
    seeder.disconnect()
    });
  });
});

// Produces what I want but does not return properly.
const encryptPassword = function(password){
    return bcrypt.genSalt(10, function(err, salt) {
      return bcrypt.hash(newUser.password, salt, function(err, hash){
          return hash})})
}

const data = [
  {
    'model': 'User',
    'documents': [
      {
        "username": "TestDemo",
        "email": "Testrun@bobo.com",
        "password": "TrueMonkeyMan"
      },
      {
        "username": "coolguy123",
        "email": "verycoolemail@mail.com",
        "password": "hoppers123"
      }
    ]
  }
];