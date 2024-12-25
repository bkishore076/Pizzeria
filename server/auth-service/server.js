const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router } = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = 3003;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(cors());
app.use('/auth', router);

app.listen(port, () => {
  console.log(`Authentication service running at http://localhost:${port}`);
});
