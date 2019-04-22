const {Category, validate} = require('../models/categories'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const categories = await Category.find().sort('name');
  res.send(categories);
});


router.get('/:author', async (req, res) => {
  const categories = await Category.find({ author: req.params.author }).sort('name').limit(15);

  if (!categories) return res.status(404).send('The categories with the given author were not found.');

  res.send(categories);
});


router.get('/category/:id', async (req, res) => {
   const category = await Category.findById(req.params.id); 

  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let category = new Category({ 
    name: req.body.name,
    IDs: req.body.IDs,
    author: req.body.author
  });
  category = await category.save();
  
  res.send(category);
});


router.put('/:id/add', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  //in update, we only add properties we wish to update, not all
  const category = await Category.findByIdAndUpdate(req.params.id,
    {
      $push: { IDs: { $each: req.body.IDs}}
    }, { new: true });

    //{ new: true}, sends back updated object, instead of original

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  
  res.send(category);
});


router.put('/:id/delete', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id,
    {
      $pullAll: { IDs: req.body.IDs}
    }, { new: true });

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  
  res.send(category);
});


router.put('/category/:id/delete', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id,
    {
      $pullAll: { IDs: req.body.IDs}
    }, { new: true });

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  
  res.send(category);
});


router.delete('/:id', async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
});


module.exports = router; 