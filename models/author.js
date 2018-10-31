const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
  };

  return Joi.validate(author, schema);
}

exports.authorSchema = authorSchema;
exports.Author = Author; 
exports.validate = validateAuthor;