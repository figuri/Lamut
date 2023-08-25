// require express
const express = require('express');

// import thought controller
const { thoughtController } = require('../../controllers');

// create router
const router = express.Router();

// route to get all thoughts
router.route('/thoughts').get(thoughtController.getAllThoughts);
// http://localhost:3001/api/thoughts

// route to get one thought by id
router.route('/thoughts/:id').get(thoughtController.getThoughtById);
// http://localhost:3001/api/thoughts/:id

// route to create a new thought
router.route('/thoughts').post(thoughtController.createThought);
// http://localhost:3001/api/thoughts

// route to update a thought by id
router.route('/thoughts/:id').put(thoughtController.updateThought);
// http://localhost:3001/api/thoughts/:id

// route to delete a thought by id
router.route('/thoughts/:id').delete(thoughtController.deleteThought);
// http://localhost:3001/api/thoughts/:id

// route to add a reaction to a thought
router.route('/thoughts/:id/reactions').post(thoughtController.addReaction);
// http://localhost:3001/api/thoughts/:id/reactions

// route to delete a reaction from a thought
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(thoughtController.deleteReaction);
// http://localhost:3001/api/thoughts/:id/reactions/:id

// export router
module.exports = router;

