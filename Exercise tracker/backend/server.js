const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // allow to parse json data

// Database settings
const DB_URI = process.env.DB_URI;

try {
  mongoose.connect(DB_URI);
} catch (err) {
  console.log(`Mongo DB connection failed ${err}`);
}

const connection = mongoose.connection;
// once the connection is open then
connection.once('open', () => {
  console.log('Connected to database successfully!');
});

// routes
const exerciseRouter = require('./routes/exercise.route');
const userRouter = require('./routes/user.route');

app.use('/exercises', exerciseRouter());
app.use('/users', userRouter());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
