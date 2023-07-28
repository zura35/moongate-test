import express from "express";
import TasksController from "../controllers/tasks";
import TaskService from "../services/tasks";

const router = express.Router();
const taskController = new TasksController(new TaskService());

router.get("/tasks", async (req, res) => {
  const response = await taskController.listTasks(req.query.cursor as string, req.query.limit as string);

  // return 200
  res.send(response);
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const response = await taskController.getTask(req.params.id);
        res.send(response);
    } catch (e: any) {
        if (e.message === "Task not found") {
            res.status(404).send();
            return;
        }
    }
});

router.post("/tasks", async (req, res) => {
    const response = await taskController.createTask(req.body.title, req.body.description);
    res.status(201).send(response);
});

router.put("/tasks/:id", async (req, res) => {
    try {
        const response = await taskController.updateTask(req.params.id, req.body.title, req.body.description);
        res.send(response);
    } catch (e: any) {
        if (e.message === "Task not found") {
            res.status(404).send();
            return;
        }
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        await taskController.deleteTask(req.params.id);
        res.status(204).send();
    } catch (e: any) {
        if (e.message === "Task not found") {
            res.status(404).send();
            return;
        }
    }
});

export default router;