// require User model
const { User } = require('../models');

// set up user controller

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            // populate thoughts
            .populate({
                path: 'thoughts',
                // exclude __v
                select: '-__v'
            })
            // populate friends
            .populate({
                path: 'friends',
                // exclude __v
                select: '-__v'
            })
            // exclude __v
            .select('-__v')
            // sort in DESC order by the _id value
            .sort({ _id: -1 })
            // send response
            .then(dbUserData => res.json(dbUserData))
            // if error, send 400 status
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // populate thoughts
            .populate({
                path: 'thoughts',
                // exclude __v
                select: '-__v'
            })
            // populate friends
            .populate({
                path: 'friends',
                // exclude __v
                select: '-__v'
            })
            // exclude __v
            .select('-__v')
            // send response
            .then(dbUserData => {
                // if no user found, send 404 status
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // else, send user data
                res.json(dbUserData);
            })
            // if error, send 400 status
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    // create user
    createUser({ body }, res) {
        User.create(body)
            // send response
            .then(dbUserData => res.json(dbUserData))
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            // send response
            .then(dbUserData => {
                // if no user found, send 404 status
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // else, send user data
                res.json(dbUserData);
            }
        )
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    },
    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            // send response
            .then(dbUserData => {
                // if no user found, send 404 status
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // else, send user data
                res.json(dbUserData);
            }
        )
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    },
    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            // find user by id
            { _id: params.userId },
            // add friend to friends array
            { $push: { friends: params.friendId } },
            // return updated user
            { new: true }
        )
            // send response
            .then(dbUserData => {
                // if no user found, send 404 status
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // else, send user data
                res.json(dbUserData);
            }
        )
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    },
    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            // find user by id
            { _id: params.userId },
            // remove friend from friends array
            { $pull: { friends: params.friendId } },
            // return updated user
            { new: true }
        )
            // send response
            .then(dbUserData => {
                // if no user found, send 404 status
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // else, send user data
                res.json(dbUserData);
            }
        )
            // if error, send 400 status
            .catch(err => res.status(400).json(err));
    }
};

// export user controller
module.exports = userController;
