const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cartRoutes = require('./routes/cartRoutes');
const { authenticate } = require('../auth-service/routes/authRoutes');
require('dotenv').config();

const app = express();
const port = 3004;

mongoose.connect('mongodb://localhost:27017/pizzeria', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


app.use(express.json());
app.use(cors());

app.use('/cart', authenticate, cartRoutes);

app.listen(port, () => {
  console.log(`Cart service listening on http://localhost:${port}`);
});
