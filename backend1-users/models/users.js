const Joi = require('joi');
const mongoose = require('mongoose');


const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  screenName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },  
  place: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  followersCount: {
    type: Number,
    required: true
  },
  followingCount: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  favoritesCount: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  }  
}));

function validateUser(user) {
  const schema = {
    name: Joi.string().min(1).max(30).required(),
    screenName: Joi.string().min(1).max(30).required(),
    place: Joi.string().min(1).max(30).required(),
    followersCount: Joi.number().required(),
    followingCount: Joi.number().required(),
    img: Joi.string().min(1).max(100).required(),
    favoritesCount: Joi.number().required(),
    userId: Joi.string().min(1).max(30).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;