const express = require("express");
const app = express();
const moment = require("moment");
const port = 3000;

let todolist = [
  {
    id: 1,
    task: "Do laundry",
    datetime: moment("26/08/2025 09:00 AM", "DD/MM/YYYY hh:mm A"),
    completed: true,
  },
  {
    id: 2,
    task: "Clean room",
    datetime: moment("26/08/2025 10:00 AM", "DD/MM/YYYY hh:mm A"),
    completed: true,
  },
  {
    id: 3,
    task: "Eat lunch",
    datetime: moment("26/08/2025 12:00 PM", "DD/MM/YYYY hh:mm A"),
    completed: false,
  },
  {
    id: 4,
    task: "Coding",
    datetime: moment("26/08/2025 01:00 PM", "DD/MM/YYYY hh:mm A"),
    completed: false,
  },
  {
    id: 5,
    task: "Go to gym",
    datetime: moment("26/08/2025 05:00 PM", "DD/MM/YYYY hh:mm A"),
    completed: false,
  },
];

/* Get all todo list */
app.get("/todo", (req, res) => {
  const formattedDatetime = todolist.map((todo) => ({
    ...todo,
    datetime: todo.datetime.format("DD/MM/YYYY hh:mm A"),
  }));
  res.json(formattedDatetime);
});

/* Add a new todo */
app.post("/todo", express.json(), (req, res) => {
  const { task, datetime, completed } = req.body;
  const newTodo = {
    id: todolist.length + 1,
    task,
    datetime: moment(datetime, "DD/MM/YYYY hh:mm A"),
    completed: completed || false,
  };
  todolist.push(newTodo);
  res.status(201).json(newTodo);
});

/* Update an existing todo */
app.put("/todo/:id", express.json(), (req, res) => {
  const { id } = req.params;
  const { task, datetime, completed } = req.body;
  const todoIndex = todolist.findIndex((todo) => todo.id === parseInt(id));
  /* If found update fields, else keep old ones */
  if (todoIndex !== -1) {
    todolist[todoIndex] = {
      ...todolist[todoIndex],
      task: task || todolist[todoIndex].task,
      datetime: datetime
        ? moment(datetime, "DD/MM/YYYY hh:mm A")
        : todolist[todoIndex].datetime,
      completed:
        completed !== undefined ? completed : todolist[todoIndex].completed,
    };
    res.json(todolist[todoIndex]);
  } else {
    res.status(404).json({ message: "That todo list was not found" });
  }
});

/* Delete a todo */
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todolist.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex !== -1) {
    todolist.splice(todoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Todo API listening on port ${port}`);
});
