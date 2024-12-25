const express = require('express');
const mongoose = require('mongoose');
const pizzaRoutes = require('./routes/pizzaRoutes');
const cors = require('cors');
const { authenticate } = require('../auth-service/routes/authRoutes');
const app = express();
const port = 3002;
require('dotenv').config();


mongoose.connect('mongodb://localhost:27017/pizzeria', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));


app.use(express.json());
app.use(cors());
app.use('/pizzas', authenticate, pizzaRoutes);

app.listen(port, () => {
  console.log(`Pizza service listening at http://localhost:${port}`);
});
