const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      }      
    }),  
    required: true
  },
  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 3,
        maxlength: 255
      },
      rentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
});

rentalSchema.statics.lookup = function(customerId, bookId) {
  return this.findOne({
    'customer._id': customerId,
    'book._id': bookId,
  });
}

// Return Book
rentalSchema.methods.return = function() {
  this.dateReturned = new Date(); 

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.book.rentalRate;
}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    bookId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;