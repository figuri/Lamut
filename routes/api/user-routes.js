// require express
const express = require('express');
// import user controller
const { userController } = require('../../controllers');

// create router
const router = express.Router();

// route to get all users
router.route('/').get(userController.getAllUsers);

// route to get one user by id
router.route('/:id').get(userController.getUserById);

// route to create a new user
router.route('/').post(userController.createUser);

// route to update a user by id
router.route('/:id').put(userController.updateUser);

// route to delete a user by id
router.route('/:id').delete(userController.deleteUser);

// route to add a friend to a user's friend list
router.route('/:userId/friends/:friendId').post(userController.addFriend);

// route to delete a friend from a user's friend list
router.route('/:userId/friends/:friendId').delete(userController.deleteFriend);

// export router
module.exports = router;
