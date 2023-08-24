// require models
const { Thought, User } = require('../models');

// set up reaction controller

const reactionController = {
    // get all reactions
    getAllReactions(req, res) {
        // find all reactions
        Reaction.find({})
            // populate thought and user data
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'user',
                select: '-__v'
            })
            // sort in descending order by id
            .sort({ _id: -1 })
            // send response
            .then(dbReactionData => res.json(dbReactionData))
            // if error, send 400 status
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one reaction by id
    getReactionById({ params }, res) {
        // find one reaction by id
        Reaction.findOne({ _id: params.id })
            // populate thought and user data
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'user',
                select: '-__v'
            })
            // send response
            .then(dbReactionData => {
                // if no reaction found, send 404 status
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                // else, send reaction data
                res.json(dbReactionData);
            })
            // if error, send 400 status
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
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