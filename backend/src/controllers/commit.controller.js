// src/controllers/commit.controller.js
const User = require('../models/user.model');

exports.updateCommits = async (req, res) => {
  try {
    const { username, filename } = req.body;

    if (!username || !filename) {
      return res.status(400).json({ message: 'Username and filename are required' });
    }

    let user = await User.findOne({ Username: username });

    if (!user) {
      user = new User({
        Username: username,
        CommitHistory: []
      });
    }

    user.CommitHistory.push({
      Date: new Date(),
      Filename: filename
    });

    await user.save();
    res.json({ message: 'Commit recorded successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.retrieveCommits = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const user = await User.findOne({ Username: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};