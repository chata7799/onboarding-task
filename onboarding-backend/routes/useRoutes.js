const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create user
router.post('/', async (req, res) => {
  const { firstName, lastName, address, birthdate, aboutMe,email,password } = req.body;
  console.log("req.body",req.body);
  try {
    const newUser = new User({
        email,
        password,
      firstName,
      lastName,  // Note: In a real app, you should hash the password before saving
      address,
      birthdate,
      aboutMe
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (for data table)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
