// require express
const express = require('express');

// import reaction controller
const { reactionController } = require('../../controllers');

// create router
const router = express.Router();

// route to get all reactions
router.route('/reactions').get(reactionController.getAllReactions);
// http://localhost:3001/api/reactions

// route to get one reaction by id
router.route('/reactions/:id').get(reactionController.getReactionById);
// http://localhost:3001/api/reactions/:id

// route to create a new reaction
router.route('/thoughts/:thoughtId/reactions').post(reactionController.addReaction);
// http://localhost:3001/api/thoughts/:thoughtId/reactions

// route to delete a reaction by id
router.route('/reactions/:id').delete(reactionController.removeReaction);
// http://localhost:3001/api/reactions/:id

// export router
module.exports = router;