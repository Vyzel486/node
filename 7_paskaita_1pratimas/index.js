const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const tasks = [];

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  const newTask = { id: tasks.length + 1, ...task };
  tasks.push(newTask);
  res.send(newTask);
});

app.get('/tasks/:id', (req, res) => {
  const id = +req.params.id;
  const foundTask = tasks.find((task) => task.id === id);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = tasks.findIndex((task) => task.id === id);
  if (foundIndex !== -1) {
    const deletingTask = tasks.find((task) => task.id === id);
    tasks.splice(foundIndex, 1);
    res.send(deletingTask);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
});

app.put('/tasks/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = tasks.findIndex((task) => task.id === id);
  if (foundIndex !== -1) {
    const task = req.body;
    const updatingTask = { id, ...task };
    tasks.splice(foundIndex, 1, updatingTask);
    res.send(updatingTask);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
});

app.listen(port, () =>
  console.log(`Server is running on the http://localhost:${port}/`),
);
