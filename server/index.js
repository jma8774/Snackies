// Set up .env file to hide our API key and stuff if anything
require("dotenv").config();

const express = require("express");
const path = require("path")
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 5000;
const db = require('./database/mongoose')
const app = express();

// Middleware to allow express to parse requests as JSON
app.use(express.json());

// Middleware that enables CORS (Idk but sometimes you need this to do some requests)
app.use(cors());

// Middleware to debug requests
app.use(morgan("tiny"));

app.use(cookieParser(process.env.COOKIE_SECRET));

// Define my routes here
const user = require('./routes/user.js');
const wishlist = require('./routes/wishlist.js');
const item = require('./routes/item.js');
app.use('/api/user', user);
app.use('/api/user/wishlist', wishlist);
app.use('/api/item', item);

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

// console.log(require('crypto').randomBytes(64).toString('hex'))