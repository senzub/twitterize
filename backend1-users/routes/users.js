const {User, validate} = require('../models/users'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/:id', async (req, res) => {
  const user = await User.findOne({ userId: `${req.params.id}` });
  if (!user) {
    res.send(['dne']);
  }
  res.send(user);
});


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({ 
    name: req.body.name,
    screenName: req.body.screenName,
    place: req.body.place,
    followersCount: req.body.followersCount,
    followingCount: req.body.followingCount,
    img: req.body.img,
    favoritesCount: req.body.favoritesCount,
    userId: req.body.userId
  });
  user = await user.save();
  
  res.send(user);
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



module.exports = router; 