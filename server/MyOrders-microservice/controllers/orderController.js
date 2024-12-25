const Order = require('../models/orderModel');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, toppings, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const newOrder = new Order({
      userId,
      items,
      toppings,
      totalAmount,
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Error placing order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const orders = await Order.find({ userId }).sort({ orderDate: -1 }); 
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};
