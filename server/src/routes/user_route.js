const express = require('express');
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const isAuth = require('../middleware/auth');

const router = express.Router();

router.get("/:username", isAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {username: req.params.username}
    });

    if (!user) {
      res.status(404).json({ message: 'username does not exist' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, nric, firstName, lastName, dob, address, gender } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      encryptedPassword,
      nric,
      firstName,
      lastName,
      dob,
      address,
      gender,
    });

    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Duplicate entry: Username or NRIC already exists' });
    }
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "username not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    const token = user.generateAuthToken();

    return res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;