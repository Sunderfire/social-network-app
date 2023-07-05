const { User } = require("../models");

module.exports = {
  async getUser(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Failed to fetch user" });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update user" });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: "Failed to delete user" });
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to add friend" });
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete friend" });
    }
  },
};
