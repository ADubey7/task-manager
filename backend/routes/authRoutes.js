const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Correct import

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser); // Ensure this matches the exported function

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser); // Ensure this matches the exported function

module.exports = router;