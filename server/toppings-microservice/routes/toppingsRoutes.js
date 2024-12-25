const express = require('express');
const router = express.Router();
const Topping = require('../models/toppingsModel');


router.get('/', async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.json(toppings);
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports = router;
