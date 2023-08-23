// setting up back end server file

// require the express module
const express = require("express");
// require mongoose
const mongoose = require("mongoose");
// require the userRoutes
const userRoutes = require("./routes/api/user-routes");
// require the thoughtRoutes
const thoughtRoutes = require("./routes/api/thought-routes");
// require the connection file
const connection = require("./config/connection");

// create an express app
const app = express();
// set up port
const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());

// use routes
app.use('/routes/user-routes')


