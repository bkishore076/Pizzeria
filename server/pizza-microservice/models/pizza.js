const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  id: String,
  iname: String,
});

const toppingSchema = new mongoose.Schema({
  id: String,
  tname: String,
  price: String,
});

const pizzaSchema = new mongoose.Schema({
  id: String,
  type: String,
  price: String,
  name: String,
  image: String,
  description: String,
  ingredients: [ingredientSchema],
  topping: [toppingSchema],
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
