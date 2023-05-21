const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const Task = require('./models/Task')
const cors = require('cors');

app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mern-tasklist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes here
app.get('/', (req, res) => {
  res.send('This is a task list app made by "Mohammad Ali" using mern stack');
});

// API route to create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  const newTask = new Task({
    title,
    description,
  });

  newTask.save()
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create task' });
    });
});

// API route to get all tasks
app.get('/api/tasks', (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    });
});

// API route to get a specific task by ID
app.get('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch task' });
    });
});

// API route to update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  Task.findByIdAndUpdate(taskId, { title, description }, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update task' });
    });
});

// API route to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndDelete(taskId)
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json({ message: 'Task deleted successfully' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete task' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
