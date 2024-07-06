const request = require("supertest");
const server = require("../../index");
const db = require("../../config/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("tasks").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("tasks endpoints", () => {
  describe("GET /api/tasks", () => {
    it("should return 200 OK", async () => {
      const response = await request(server).get("/api/tasks");
      expect(response.status).toBe(200);
    });

    it("should return an array of tasks", async () => {
      await db("tasks").insert({ title: "Test task" });
      const response = await request(server).get("/api/tasks");
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe("Test task");
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should return 200 OK for existing task", async () => {
      const [id] = await db("tasks").insert({ title: "Test task" });
      const response = await request(server).get(`/api/tasks/${id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Test task");
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(server).get("/api/tasks/999");
      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const newTask = { title: "New task", description: "Task description" };
      const response = await request(server).post("/api/tasks").send(newTask);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newTask.title);
      expect(response.body.description).toBe(newTask.description);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update an existing task", async () => {
      const [id] = await db("tasks").insert({ title: "Test task" });
      const updatedTask = { title: "Updated task" };
      const response = await request(server)
        .put(`/api/tasks/${id}`)
        .send(updatedTask);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedTask.title);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(server)
        .put("/api/tasks/999")
        .send({ title: "Updated task" });
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete an existing task", async () => {
      const [id] = await db("tasks").insert({ title: "Test task" });
      const response = await request(server).delete(`/api/tasks/${id}`);
      expect(response.status).toBe(204);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(server).delete("/api/tasks/999");
      expect(response.status).toBe(404);
    });
  });
});
