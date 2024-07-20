import { Router } from "express";
import TaskController from "../controllers/task/TaskController";

const TaskRoutes = Router();

TaskRoutes.get("/", TaskController.getAll);
TaskRoutes.post("/", TaskController.create);
TaskRoutes.put("/:idTask", TaskController.update);

export default TaskRoutes;
