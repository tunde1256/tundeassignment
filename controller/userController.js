const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Register new user
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        // Generate and send JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ message:"regisration successful",token});
        console.log(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const User = require('../models/userModel'); // Assuming you have this model

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll(); // Assuming findAll method in userModel.js
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

