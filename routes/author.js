const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Author, validate} = require('../models/author'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Book} = require('../models/book');

// Get All Authors
router.get('/', auth, async (req, res) => {
  const authors = await Author.find().populate('books', 'title').sort('name')

  if(!authors) return res.status(404).send('Authors not found'); 

  res.status(200).send(authors);
});

// GET author by ID
router.get('/:id', auth, async (req, res) => {
  const author = await Author.findById(req.params.id)

  if (!author) return res.status(404).send('The author with the given ID was not found.');

  res.status(200).send(author);
});

// POST create new author
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const author = new Author({ 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  await author.save();

  if(!author) return res.status(404).send('Autor was not created.')

  res.status(200).send(author);
});

// PUT update author with id
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const author = await Author.findByIdAndUpdate(req.params.id,{ 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }, { new: true })
  if (!author) return res.status(404).send('The author with the given ID was not found.');

  res.status(200).send(author);
});

// DELETE author by id
router.delete('/:id', [auth, admin], async (req, res) => {
  const author = await Author.findByIdAndRemove(req.params.id)

  if (!author) return res.status(404).send('The author with the given ID was not found.');

  res.status(200).send(author);
});

// DELETE all authors
router.delete('/', [auth, admin], async (req, res) => {
  const autohr = await Author.deleteMany()

  if (!author) return res.status(404).send('The author with the given ID was not found.');

  res.status(200).send(author);
});

module.exports = router; 