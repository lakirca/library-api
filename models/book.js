const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const {authorSchema} = require('./author');


const Book = mongoose.model('Books', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 255
  },
  description: {
    type: String
  },
  author: {
    type: authorSchema,
    required: true
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  rentalPrice: {
    type: Number,
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
    description: Joi.string().min(3).max(50),
    genreId: Joi.objectId().required(),
    authorId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    rentalPrice: Joi.number().min(1).required(),
    rentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(book, schema);
}

exports.Book = Book; 
exports.validate = validateBook;