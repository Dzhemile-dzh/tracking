const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();


const corsOptions = {
  origin: ['chrome-extension://hjlgkbmdjbgffafjckopgfdifalbclkk', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;  // Get URI from .env file

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: Number,
  subtasks: [String],
  completedSubtasks: [Boolean]
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Create task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get task by ID
app.get('/tasks/:id', async (req, res) => {
  console.log(`Received request for task ID: ${req.params.id}`);
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task
app.put('/tasks/:id', async (req, res) => {
  console.log(`Received update request for task ID: ${req.params.id}`);
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Delete task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
