// require models
const { Thought, User } = require('../models');

// set up reaction controller

const reactionController = {
    // add reaction to thought
    addReaction({ params, body }, res) {
        // create reaction
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // add reaction to reactions array
            { $push: { reactions: body } },
            // return updated thought
            { new: true, runValidators: true }
        )
            // send response
            .then(dbThoughtData => {
                // if no thought found, send 404 status
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                // else, send thought data
                res.json(dbThoughtData);
            }
        )
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    },
    // remove reaction from thought
    removeReaction({ params }, res) {
        // find thought by id and update
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // remove reaction from reactions array
            { $pull: { reactions: { reactionId: params.reactionId } } },
            // return updated thought
            { new: true }
        )
            // send response
            .then(dbThoughtData => res.json(dbThoughtData))
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    }
};

// export reaction controller
module.exports = reactionController;