const Joi = require('joi');
const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 13,
    unique: true
  },
  IDs: {
    type: Array,
    required: true,
    minlength: 1
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  }
}));

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(1).max(13).required(),
    IDs: Joi.array().items(Joi.string().min(1)).required(),
    author: Joi.string().min(1).max(30).required()
  };

  return Joi.validate(category, schema);
}

exports.Category = Category; 
exports.validate = validateCategory;