const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePointOfInterestInput(data, index, startTime, endTime) {
  let errors = {};
  errors.index = index;
  if(data.name === undefined || data.startTime === undefined || data.endTime === undefined )
  {
    errors.error = "Poi not formated properly"
    return {
    errors,
    isValid: false
  }}

  data.name = validText(data.name) ? data.name : '';
  data.description = validText(data.description) ? data.description : '';

  // Validate Name

  if (!Validator.isLength(data.name, {min:2, max: 100 })){
    errors.name = "Name must be between 2 and 100 characters"
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'; 
  }

  // Limit description to 200 characters.
  if (!Validator.isLength(data.description, {min:0, max: 200 })){
    errors.name = "Description must be between 0 and 200 characters"
  }

  // Validate presence of Start Time
  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = "Start time is required";
  }

  // Validate presence of End Time
  if (Validator.isEmpty(data.endTime)) {
    errors.endTime = "End time is required";
  }

  // Validates legitimate start and end time
  if (new Date(data.startTime) > new Date(data.endTime) && !Validator.isEmpty(data.startTime)) {
    errors.startTime = "Invalid start time"
    errors.endTime = "Invalid end time"
  }

  if (new Date(startTime) > new Date(data.startTime) || new Date(endTime) < new Date(data.startTime)){
    errors.startTime = "Invalid start time"
  }

  if (new Date(startTime) > new Date(data.endTime) || new Date(endTime) < new Date(data.endTime)){
    errors.endTime = "Invalid end time"
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 1
  };
};