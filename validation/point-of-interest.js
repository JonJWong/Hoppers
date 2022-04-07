const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePointOfInterestInput(data, index) {
  let errors = {};
  errors.index = index;

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
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};