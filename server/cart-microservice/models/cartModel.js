const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  items: [
    {
      pizzaId: { type: String, required: true }, 
      name: { type: String, required: true },   
      image: {type: String},
      description: {type: String},
      price: { type: Number, required: true },  
      qty: { type: Number, required: true },    
    },
  ],
  toppings: [
    {
      name: { type: String, required: true },   
      price: { type: Number, required: true },
      image: {type: String, required: true},
      qty: { type: Number} 
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
