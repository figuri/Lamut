const mongoose = require('mongoose');

// connect to the database by wrapping mongoose around the local connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/lamut');

// export connection
module.exports = mongoose.connection;