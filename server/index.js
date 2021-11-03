// Set up .env file to hide our API key and stuff if anything
require("dotenv").config();

const express = require("express");
const path = require("path")
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// Middleware to allow express to parse requests as JSON
app.use(express.json());

// Middleware that enables CORS (Idk but sometimes you need this to do some requests)
app.use(cors());

// Middleware to debug requests
app.use(morgan("tiny"));

// Define my routes here
const user = require('./routes/user.js');
app.use('/user', user);

// Needed for Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));