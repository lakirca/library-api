const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Book, validate} = require('../models/book'); 
const {Genre} = require('../models/genre');
const {Author} = require('../models/author');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// GET all books
router.get('/', async (req, res) => {
  const books = await Book.find().sort('title');
  res.status(200).send(books);
});

// GET book by ID
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found.');

  res.status(200).send(book);
});

// POST create book
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Find Genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  // Find Author 
  const author = await Author.findById(req.body.authorId);
  if (!author) return res.status(400).send('Invalid author.');

  const book = new Book({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    }, 
    author: {
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName
    },
    numberInStock: req.body.numberInStock,
    rentalRate: req.body.rentalRate,
    price: req.body.price
  });
  await book.save();
  
  res.status(200).send(book);
});

// PUT update book
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Find Genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  // Find Author
  const author = await Author.findById(req.body.authorId);
  if (!author) return res.status(400).send('Invalid author.');

  const book = await Book.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      author: {
        _id: author. _id,
        firstName: author.firstName,
        lastName: author.lastName
      },
      numberInStock: req.body.numberInStock,
      rentalRate: req.body.rentalRate,
      price: req.body.price
    }, { new: true });

  if (!book) return res.status(404).send('The book with the given ID was not found.');
  
  res.status(200).send(book);
});

// DELETE book by ID
router.delete('/:id', [auth, admin], async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found.');

  res.status(200).send(book);
});


module.exports = router; 