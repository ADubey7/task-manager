const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description } = req.body;

  console.log('Request Body:', req.body); // Debug: Log the request body

  try {
    const task = await Task.create({
      user: req.user._id, // Attach the logged-in user's ID
      title,
      description,
    });

    console.log('Task created:', task); // Debug: Log the created task

    res.status(201).json(task);
  } catch (error) {
    console.error('Error:', error); // Debug: Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }); // Fetch tasks for the logged-in user
    console.log('Tasks fetched:', tasks); // Debug: Log the fetched tasks
    res.json(tasks);
  } catch (error) {
    console.error('Error:', error); // Debug: Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  console.log('Request Body:', req.body); // Debug: Log the request body

  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists and belongs to the logged-in user
    if (!task || task.user.toString() !== req.user._id.toString()) {
      console.log('Task not found or unauthorized:', req.params.id); // Debug: Log task not found
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed || task.completed;

    const updatedTask = await task.save();
    console.log('Task updated:', updatedTask); // Debug: Log the updated task

    res.json(updatedTask);
  } catch (error) {
    console.error('Error:', error); // Debug: Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists and belongs to the logged-in user
    if (!task || task.user.toString() !== req.user._id.toString()) {
      console.log('Task not found or unauthorized:', req.params.id); // Debug: Log task not found
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    console.log('Task deleted:', task); // Debug: Log the deleted task

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error:', error); // Debug: Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };