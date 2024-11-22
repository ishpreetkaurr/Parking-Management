const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoute');
const parkingRoutes = require('./routes/parkingRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api', parkingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
