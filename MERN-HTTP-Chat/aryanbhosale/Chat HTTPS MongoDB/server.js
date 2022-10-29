// Importing NPM packages, I installed 6 packages for the server namely 1. mongoose, 2. express, 3. axios, 4. morgan, 5. concurrently, and 6. nodemon
const express = require('express'); // Importing from express
const mongoose = require('mongoose'); // Importing from mongoose
const morgan = require('morgan'); // Importing from morgan
const cors = require('cors'); // to resolve CORS errors
const path = require('path'); // Built-in library in NodeJS

// Initialize the express application
const app = express();

// Define a PORT for Heroku Deploy
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const MONGODB_URI = 'mongodb+srv://aryanbhosale:MernChatPass@mernchat.cwiza8h.mongodb.net/?retryWrites=true&w=majority';

// Making connection to MongoDB
mongoose.connect(MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost/mernchat', {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

// Listener for mongoose
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!");
});

app.use(cors()); // resolves CORS errors

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan('tiny')); // Logs HTTP requests in the terminal

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

app.use('/api', routes);


app.listen(PORT, console.log(`Server is starting at PORT : ${PORT}`));