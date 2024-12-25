const Cart = require('../models/cartModel');
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ message: 'Cart is empty' });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pizzaId, name, price, qty, image } = req.body;

    if (!pizzaId || !name || !price || !qty) {
      return res.status(400).json({ error: 'Pizza fields are missing' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], toppings: [] });
    }

    const existingItem = cart.items.find((item) => item.pizzaId === pizzaId);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ pizzaId, name, price, qty, image });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding pizza to cart:', error);
    res.status(500).json({ error: 'Error adding pizza to cart' });
  }
};

exports.addToppingsToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { toppings } = req.body; 
    if (!toppings || toppings.length === 0) {
      return res.status(400).json({ error: 'Toppings are required' });
    }

    const invalidTopping = toppings.find((topping) => !topping.name || !topping.price);
    if (invalidTopping) {
      return res.status(400).json({ error: 'Each topping must have a name and price' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    toppings.forEach((topping) => {
      const existingTopping = cart.toppings.find((t) => t.name === topping.name);
      if (!existingTopping) {
        cart.toppings.push(topping);
      }
    });

    await cart.save(); 
    return res.status(200).json(cart); 
  } catch (error) {
    console.error('Error adding toppings to cart:', error);
    return res.status(500).json({ error: 'Error adding toppings to cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pizzaId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.pizzaId !== pizzaId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
};

exports.removeToppingFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { tname } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.toppings = cart.toppings.filter((topping) => topping.name !== tname);

    await cart.save(); 

    res.status(200).json(cart); 
  } catch (error) {
    res.status(500).json({ error: 'Error removing topping from cart' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId =req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = [];
    cart.toppings = [];
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pizzaId, qty } = req.body;

    if (!pizzaId || qty === undefined) {
      return res.status(400).json({ error: 'Pizza ID and quantity are required' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find((item) => item.pizzaId === pizzaId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (qty <= 0) {
      cart.items = cart.items.filter((item) => item.pizzaId !== pizzaId);
    } else {
      item.qty = qty;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error updating quantity' });
  }
};