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
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).update(updateThought).delete(deleteThought);

// /api/thoughtt/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)

module.exports = router;
