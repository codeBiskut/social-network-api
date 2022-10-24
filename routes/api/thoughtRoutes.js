const router = require('express').Router();

// get all thoughts
// get one thought by id
// post a thought (push thought id to user's thought array)
// put a thought by id
// delete a thought by id

// api/thoughts/:id/reactions
// post a reaction to a thought (add to thought's reaction array)
// delete a reaction to a thought by reaction's id (remove from thought's reaction array)

const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/courseController.js');

// /api/courses
router.route('/').get(getCourses).post(createCourse);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
