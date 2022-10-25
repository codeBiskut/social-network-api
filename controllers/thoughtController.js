const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// get all thoughts
// get one thought by id
// post a thought (push thought id to user's thought array)
// put a thought by id
// delete a thought by id

// api/thoughts/:id/reactions
// post a reaction to a thought (add to thought's reaction array)
// delete a reaction to a thought by reaction's id (remove from thought's reaction array)

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Thought.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() => res.json({ message: 'Thought and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this id!' })
          return;
        }
        res.status(200).json(user)
        
      })
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { new: true, runValidators: true }
    )
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this id!' })
          return;
        }
        res.status(200).json(user)
          .catch((err) => {
            res.status(500).json(err)
          })
      })
  }
};