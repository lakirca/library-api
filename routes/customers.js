const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Customer, validate} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// GET All customers
router.get('/', [auth, admin] ,async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.status(200).send(customers);
});

// GET customer by ID
router.get('/:id', [auth, admin], async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.status(200).send(customer);
});

// POST create customer
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
    card: req.body.card
  });
  customer = await customer.save();
  
  res.status(200).send(customer);
});

// PUT update customer
router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
      card: req.body.card
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.status(200).send(customer);
});

// DELETE Customer by ID
router.delete('/:id', [auth,admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.status(200).send(customer);
});

module.exports = router; 