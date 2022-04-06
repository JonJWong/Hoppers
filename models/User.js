const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);