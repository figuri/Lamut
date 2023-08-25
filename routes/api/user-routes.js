// require express
const express = require('express');
// import user controller
const { userController } = require('../../controllers');

// create router
const router = express.Router();

// route to get all users
router.route('/user').get(userController.getAllUsers);
// http://localhost:3001/api/user

// route to get one user by id
router.route('/user/:id').get(userController.getUserById);
// http://localhost:3001/api/user/:id

// route to create a new user
router.route('/user').post(userController.createUser);
// http://localhost:3001/api/user

// route to update a user by id
router.route('/user/:id').put(userController.updateUser);
// http://localhost:3001/api/user/:id

// route to delete a user by id
router.route('/user/:id').delete(userController.deleteUser);
// http://localhost:3001/api/user/:id

// route to add a friend to a user's friend list
router.route('/user/:userId/friends/:friendId').post(userController.addFriend);
// http://localhost:3001/api/user/:id/friends/:id

// route to delete a friend from a user's friend list
router.route('/user/:userId/friends/:friendId').delete(userController.deleteFriend);
// http://localhost:3001/api/user/:id/friends/:id




// export router
module.exports = router;
