const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // Array of Points of Interests Object
  PointsOfInterest: [
    {
      startTime: {
        type: Date, 
        required: true
      },

      endTime: {
        type: Date, 
        required: true
      },
      latitude: {
        type: Number, 
      },
      longitude: {
        type: Number, 
      },
    }
  ],
  // Array of Users Ids 
  attendees: [ {
    type: Schema.Types.ObjectId, 
    ref: 'users'
  }
  ],
  threads: [{
    type: Schema.Types.ObjectId,
    ref: "threads"
  }]
}, {
  timestamps: true
});

module.exports = Event = mongoose.model('Event', EventSchema)