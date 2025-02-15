const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const isAuth = require('../middleware/auth');

const router = express.Router();

router.get("/dashboard", isAuth, async (req, res) => {
  try {
    console.log("getting user data");
    const user = await User.findOne({
      where: {username: req.user.username}
    });

    if (!user) {
      res.status(404).json({ message: 'Username does not exist' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, nric, firstName, lastName, dob, address, gender } = req.body.formData;

    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      password: encryptedPassword,
      nric,
      firstName,
      lastName,
      dob,
      address,
      gender,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Username or NRIC already exists' });
    }
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body.formData;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("user not found");
      return res.status(401).json({ message: "Wrong Username or Password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("user not found");
      return res.status(401).json({ message: "Wrong Username or Password!" });
    }

    const token = user.generateAuthToken();

    return res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;