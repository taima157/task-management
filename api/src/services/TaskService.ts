import { CreateTaskRequestDTO } from "../controllers/task/dto/CreateTaskRequestDTO";
import { UpdateSubTaskRequestDTO } from "../controllers/task/dto/UpdateSubTaskRequestDTO";
import { UpdateTaskRequestDTO } from "../controllers/task/dto/UpdateTaskRequestDTO";
import SubTask from "../models/SubTask";
import Task from "../models/Task";
import StatusError, { StatusErrorEnum } from "../utils/errors/StatusError";
import SubTaskService from "./SubTaskService";

export default class TaskService {
  static async findAll() {
    return await Task.findAll({
      include: [
        { model: SubTask, as: "subTasks", order: { col: "createdAt" } },
      ],
    });
  }

  static async findById(idTask: string) {
    const task = await Task.findByPk(idTask, {
      include: [{ model: SubTask, as: "subTasks" }],
    });

    if (task) return task;

    throw new StatusError(StatusErrorEnum.NOT_FOUND, "Tarefa não encontrada!");
  }

  static async create(createTaskRequestDTO: CreateTaskRequestDTO) {
    const task = await Task.create(createTaskRequestDTO, {
      include: [{ model: SubTask, as: "subTasks" }],
    });

    task.save();

    return task;
  }

  static async update(
    idTask: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO
  ) {
    const task = await this.findById(idTask);
    task.update(updateTaskRequestDTO);

    const dbSubTasks = await task.getSubTasks();
    await SubTaskService.updateSubTasks(
      updateTaskRequestDTO.subTasks,
      dbSubTasks
    );

    await task.reload();

    return task;
  }
}
