const Validator = require('validator');
const validText = require('./valid-text');

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

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};