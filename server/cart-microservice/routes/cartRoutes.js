const express = require('express');
const { getCart, addToCart, removeFromCart, clearCart,updateQuantity,addToppingsToCart,removeToppingFromCart } = require('../controllers/cartController');
const router = express.Router();


router.get('/', getCart);


router.post('/add', addToCart);

router.post('/addToppings', addToppingsToCart);

router.delete('/remove/:pizzaId', removeFromCart);

router.delete('/removeTopping/:tname', removeToppingFromCart);



router.delete('/clear', clearCart);

router.post('/updateQty', updateQuantity);

module.exports = router;
