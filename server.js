// require express
const express = require('express');

// import mongoose connection
const mongoose = require('./config/connection');

// create express app
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import and use route files
const userRoutes = require('./routes/api/user-routes');
const thoughtRoutes = require('./routes/api/thought-routes');
const reactionRoutes = require('./routes/api/reaction-routes');

app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);
app.use('/api', reactionRoutes);

// default route handler for undefined routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
