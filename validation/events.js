const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.description = validText(data.description) ? data.description : "";



  // Validate Poi(Point of interest)
  if (data.PointsOfInterest.length < 1) {
    errors.PointsOfInterest = "Must have at least 1 point of interest"
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'; 
  }

  // Validate Description
  if(Validator.isEmpty(data.description)){
    errors.description  = "Description is required";
  }

  // Validate Start Time
  if (Validator.isEmpty(data.startTime) || data.startTime === "Invalid Date") {
    errors.startTime = "Start time is required";
  }

  // Validate End Time
  if (Validator.isEmpty(data.endTime) || data.endTime === "Invalid Date") {
    errors.endTime = "End time is required";
  }

  // Check that end time is after start time. Only check if both are valid to begin with
  if (new Date(data.startTime) > new Date(data.endTime) && 
    !Validator.isEmpty(data.startTime) &&  !Validator.isEmpty(data.endTime)) {
      errors.startTime = "End time before start"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};