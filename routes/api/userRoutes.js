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
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require('../../controllers/studentController');

// /api/students
router.route('/').get(getStudents).post(createStudent);

// /api/students/:studentId
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
