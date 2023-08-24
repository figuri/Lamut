// require express
const express = require('express');

// import thought controller
const { thoughtController } = require('../../controllers');

// create router
const router = express.Router();

// route to get all thoughts
router.route('/thoughts').get(thoughtController.getAllThoughts);

// route to get one thought by id
router.route('/thoughts/:id').get(thoughtController.getThoughtById);

// route to create a new thought
router.route('/thoughts').post(thoughtController.createThought);

// route to update a thought by id
router.route('/thoughts/:id').put(thoughtController.updateThought);

// route to delete a thought by id
router.route('/thoughts/:id').delete(thoughtController.deleteThought);

// route to add a reaction to a thought
router.route('/thoughts/:id/reactions').post(thoughtController.addReaction);

// route to delete a reaction from a thought
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(thoughtController.deleteReaction);

// export router
module.exports = router;

