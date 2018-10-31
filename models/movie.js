const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Book = mongoose.model('Books', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  rentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateBook(book) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    rentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(book, schema);
}

exports.Book = Book; 
exports.validate = validateBook;