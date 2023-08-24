// combine all controller modules for easier importing/exporting

// Path: controllers\index.js
// require modules
const thoughtController = require('./thought-controller');
const userController = require('./user-controller');
const reactionController = require('./reaction-controller');

// export modules
module.exports = { thoughtController, userController, reactionController };