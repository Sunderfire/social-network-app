const { User, Thought } = require("../models");

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
      const user = await User.findById(req.params.id);
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
      const { userId, newData } = req.body;
      const user = await User.findOneAndUpdate({ _id: userId }, newData, {
        new: true,
      });

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
      const user = await User.findOneAndDelete(req.params.id);

      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: "Failed to delete user" });
    }
  },

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to add friend" });
    }
  },

  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete friend" });
    }
  },
};
