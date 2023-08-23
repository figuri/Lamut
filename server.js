// setting up back end server file

// require the express module
const express = require("express");
// require mongoose
const mongoose = require("mongoose");
// require the userRoutes
const userRoutes = require("./routes/user-routes");
// require the thoughtRoutes
const thoughtRoutes = require("./routes/thought-routes");

// create an express app
const app = express();
// set up port
const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());

// connect to mongoose

// require the mongoose configuration file which does the rest for us
// use bodyParser to parse form data sent via HTTP POST
