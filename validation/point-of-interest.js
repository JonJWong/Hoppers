const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePointOfInterestInput(data, index, startTime, endTime) {
  let errors = {};
  errors.index = index;
  console.log(data)
  if(data.name === undefined){data.name = ""}

  data.name = validText(data.name) ? data.name : '';
  data.description = validText(data.description) ? data.description : '';

  // Validate Name

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'; 
  }

  // Limit description to 200 characters.
  if (!Validator.isLength(data.description, {min:0, max: 200 })){
    errors.name = "Description must be between 0 and 200 characters"
  }

  // Validate presence of Start Time
  if (Validator.isEmpty(data.startTime) || data.startTime === "Invalid Date") {
    errors.startTime = "Invalid start time";
  }

  // Validate presence of End Time
  if (Validator.isEmpty(data.endTime) || data.endTime === "Invalid Date") {
    errors.endTime = "Invalid end time";
  }

  // Validates legitimate start and end time
  if (new Date(data.startTime) > new Date(data.endTime) 
    && !Validator.isEmpty(data.startTime) && !Validator.isEmpty(data.endTime)) 
    {
      errors.endTime = "End time before start"
    }

  // Only check if start time is within bounds
  if (startTime !== null) {
    if (new Date(startTime) > new Date(data.startTime) || new Date(endTime) < new Date(data.startTime)){
      errors.startTime = "Invalid start time"
    }
  }
  // Check if end time is within bounds
  if (endTime !== null) {
    if (new Date(startTime) > new Date(data.endTime) || new Date(endTime) < new Date(data.endTime)){
      errors.endTime = "Invalid end time"
    }
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 1
  };
};