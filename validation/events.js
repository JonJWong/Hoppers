const Validator = require('validator');
const validText = require('./valid-text');
const validStartandEndTimes = require('./valid-times')

module.exports = function validateEventInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.description = validText(data.description) ? data.description : "";

  // Validate Name
  if (!Validator.isLength(data.name, {min:2, max: 100 })){
    errors.name = "Name must be between 2 and 100 characters"
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'; 
  }

  // Validate Description
  if(Validator.isEmpty(data.description)){
    errors.description  = "Description is required";
  }

  // Validate Start Time
  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = "Start time is required";
  }

  // Validate End Time
  if (Validator.isEmpty(data.endTime)) {
    errors.endTime = "End time is required";
  }

  // Validate Poi(Point of interest)
  if (data.PointsOfInterest.length < 1) {
    errors.PointsOfInterest = "Must have atleast 1 point of interest"
  }

  // // Validate start and end times
  // if(!validStartandEndTimes(data.startTime, data.endTime)){
  //   errors.times = "Invalid Start and/or EndTimes"
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};