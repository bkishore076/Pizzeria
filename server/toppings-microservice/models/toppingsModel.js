const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
  id: String,
  tname: String,
  price: String,
  image: String,
});

const Topping = mongoose.model('Topping', toppingSchema);

module.exports = Topping;
