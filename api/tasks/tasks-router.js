const express = require("express");
const db = require("../../config/db-config");

const router = express.Router();

// GET all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await db("tasks");
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET a single task by id
router.get("/:id", async (req, res, next) => {
  try {
    const [task] = await db("tasks").where({ id: req.params.id });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    next(err);
  }
});

// POST a new task
router.post("/", async (req, res, next) => {
  try {
    const [id] = await db("tasks").insert(req.body);
    const newTask = await db("tasks").where({ id }).first();
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// PUT (update) a task
router.put("/:id", async (req, res, next) => {
  try {
    const count = await db("tasks")
      .where({ id: req.params.id })
      .update(req.body);
    if (count) {
      const updatedTask = await db("tasks")
        .where({ id: req.params.id })
        .first();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE a task
router.delete("/:id", async (req, res, next) => {
  try {
    const count = await db("tasks").where({ id: req.params.id }).del();
    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
