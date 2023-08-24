// require express
const express = require('express');

// import reaction controller
const { reactionController } = require('../../controllers');

// create router
const router = express.Router();

// route to get all reactions
router.route('/reactions').get(reactionController.getAllReactions);

// route to get one reaction by id
router.route('/reactions/:id').get(reactionController.getReactionById);

// route to create a new reaction
router.route('/reactions').post(reactionController.createReaction);

// route to delete a reaction by id
router.route('/reactions/:id').delete(reactionController.deleteReaction);

// export router
module.exports = router;