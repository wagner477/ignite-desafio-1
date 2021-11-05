const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const users = [];

function checkUserExists(req, res, next) {
  const { username } = req.headers;

  if (!username) {
    return res.status(400).json({ error: "Invalid username." });
  }

  const user = users.find((user) => user.username === username);

  if (!user) {
    res.status(400).json({ error: "User not found" });
  }

  req.user = user;

  next();
}

app.post("/users", (req, res) => {
  const { name, username } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Invalid name." });
  }

  if (!username) {
    return res.status(400).json({ error: "Invalid username." });
  }

  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ error: "User exists" });
  }

  const newUser = {
    id: uuid(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.get("/todos", checkUserExists, (req, res) => {
  const { user } = req;

  return res.json(user.todos);
});

app.post("/todos", checkUserExists, (req, res) => {
  const { user } = req;
  const { title, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Invalid title" });
  }

  const todoExists = user.todos.some((todo) => todo.title === title);

  if (todoExists) {
    return res.status(400).json({ error: "Title already used." });
  }

  const newTodo = {
    id: uuid(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(newTodo);

  return res.status(201).json(newTodo);
});

app.put("/todos/:id", checkUserExists, (req, res) => {
  const { user } = req;
  const { title, deadline } = req.body;
  const { id } = req.params;

  const todoToBeChanged = user.todos.find((todo) => todo.id === id);

  if (!todoToBeChanged) {
    return res.status(404).json({ error: "Todo not found!" });
  }

  todoToBeChanged.title = title;
  todoToBeChanged.deadline = new Date(deadline);

  return res.send(todoToBeChanged);
});

app.patch("/todos/:id/done", checkUserExists, (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const todoToBeChanged = user.todos.find((todo) => todo.id === id);

  if (!todoToBeChanged) {
    return res.status(404).json({ error: "Todo not found!" });
  }

  todoToBeChanged.done = true;

  return res.json(todoToBeChanged);
});

app.delete("/todos/:id", checkUserExists, (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found." });
  }

  console.log(todoIndex);

  user.todos.splice(todoIndex, 1);

  return res.status(204).send();
});

module.exports = app;
