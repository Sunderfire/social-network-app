const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      return res.json(thoughts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to fetch thoughts" });
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      return res.json(thought);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch thought" });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      return res.json(thought);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create thought" });
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      return res.json(thought);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create thought" });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      return res.json(thought);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete thought" });
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      return res.json(thought);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create reaction" });
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { thoughts: req.params.thoughtIdId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      return res.json(thought);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete reaction" });
    }
  },
};
