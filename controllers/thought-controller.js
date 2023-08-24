// require model
const { Thought, User } = require('../models');

// set up thought controller

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            // populate reactions
            .populate({
                path: 'reactions',
                // exclude __v
                select: '-__v'
            })
            // exclude __v
            .select('-__v')
            // sort in DESC order by the _id value
            .sort({ _id: -1 })
            // send response
            .then(dbThoughtData => res.json(dbThoughtData))
            // if error, send 400 status
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            // populate reactions
            .populate({
                path: 'reactions',
                // exclude __v
                select: '-__v'
            })
            // exclude __v
            .select('-__v')
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
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            // destructure username from body
            .then(({ _id, username }) => {
                // find user by username
                return User.findOneAndUpdate(
                    { username: username },
                    // add thought to thoughts array
                    { $push: { thoughts: _id } },
                    // return updated user
                    { new: true }
                );
            }
        )
            // send response
            .then(dbUserData => {
                // if no user found, send 404 status
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!' });
                    return;
                }
                // else, send user data
                res.json(dbUserData);
            }
        )
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(body, { new: true, runValidators: true })
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
    // delete thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
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
    // add reaction
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
    }
};

// export thought controller
module.exports = thoughtController;
