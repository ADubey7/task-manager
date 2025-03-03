const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Protect all task routes
router.use(protect);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', createTask);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
router.get('/', getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;