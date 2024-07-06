exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          title: "Complete project setup",
          description: "Finish setting up the Node.js project structure",
        },
        {
          title: "Write API endpoints",
          description: "Implement CRUD operations for tasks",
        },
        {
          title: "Write tests",
          description: "Create comprehensive tests for the API",
        },
      ]);
    });
};
