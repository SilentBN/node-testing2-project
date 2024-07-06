const express = require("express");
const tasksRouter = require("./api/tasks/tasks-router");

const server = express();

server.use(express.json());

server.use("/api/tasks", tasksRouter);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "An unexpected error occurred",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
