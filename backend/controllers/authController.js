const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Request Body:', req.body); // Debug: Log the request body

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email); // Debug: Log duplicate email
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user (password will be hashed by the User model's pre-save hook)
    const user = await User.create({ name, email, password });
    console.log('User created:', user); // Debug: Log the created user

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Send the response
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error('Error:', error); // Debug: Log the full error object
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Attempting to login with:', { email, password }); // Debug: Log login attempt

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // Debug: Log user not found
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    console.log('Plain Password:', password.trim()); // Debug: Log the trimmed plain password
    console.log('Hashed Password in DB:', user.password); // Debug: Log the hashed password
    const isMatch = await user.matchPassword(password.trim()); // Use matchPassword method
    console.log('Password Match Result:', isMatch); // Debug: Log the comparison result

    if (!isMatch) {
      console.log('Password mismatch for user:', email); // Debug: Log password mismatch
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Login successful for user:', email); // Debug: Log successful login
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error('Login error:', error); // Debug: Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export the functions
module.exports = { registerUser, loginUser };