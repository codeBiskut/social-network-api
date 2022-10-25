const router = require('express').Router();

// get all users
// get one user by id (and populate thoughts and friends arrays)
// post a new user
// put a user by id
// delete a user by id (bonus to remove thoughts on user delete)

// api/users/:userid/friends/:friendid
// post to add friend to user's friend array
// delete to remove friend from user's friend array

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend);

module.exports = router;