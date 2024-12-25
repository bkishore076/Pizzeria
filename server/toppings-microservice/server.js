const express = require('express');
const mongoose = require('mongoose');
const toppingsRoutes = require('./routes/toppingsRoutes');
const cors = require('cors');
const { authenticate } = require('../auth-service/routes/authRoutes');
require('dotenv').config();
const app = express();
const port = 3001;


mongoose.connect('mongodb://localhost:27017/pizzeria', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));


app.use(express.json());
app.use(cors());
app.use('/toppings', authenticate, toppingsRoutes);

app.listen(port, () => {
  console.log(`Toppings service listening at http://localhost:${port}`);
});
