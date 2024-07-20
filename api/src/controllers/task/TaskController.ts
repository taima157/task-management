import { NextFunction, Request, Response } from "express";
import TaskService from "../../services/TaskService";
import { CreateTaskRequestDTO } from "./dto/CreateTaskRequestDTO";
import { UpdateTaskRequestDTO } from "./dto/UpdateTaskRequestDTO";

export default class TaskController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    return res.status(200).send(await TaskService.findAll());
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateTaskRequestDTO = req.body;

      res.status(201).send(await TaskService.create(body));
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UpdateTaskRequestDTO = req.body;
      const { idTask } = req.params;

      res.status(200).send(await TaskService.update(idTask, body));
    } catch (err) {
      next(err);
    }
  }
}
