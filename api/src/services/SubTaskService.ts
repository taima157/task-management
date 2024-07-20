import { UpdateSubTaskRequestDTO } from "../controllers/task/dto/UpdateSubTaskRequestDTO";
import SubTask from "../models/SubTask";

export default class SubTaskService {
  static async findById(idSubTask: string) {
    return await SubTask.findByPk(idSubTask);
  }

  static async findAllByIdTask(idTask: string) {
    return await SubTask.findAll({
      where: {
        idTask,
      },
    });
  }

  static async create(updateSubTaskRequestDTO: UpdateSubTaskRequestDTO) {
    await SubTask.create(updateSubTaskRequestDTO);
  }

  static async update(updateSubTaskRequestDTO: UpdateSubTaskRequestDTO) {
    const subTask = await this.findById(updateSubTaskRequestDTO.idSubTask);
    await subTask.update(updateSubTaskRequestDTO);
  }

  static async delete(updateSubTaskRequestDTO: UpdateSubTaskRequestDTO) {
    const subTask = await this.findById(updateSubTaskRequestDTO.idSubTask);
    await subTask.destroy();
  }

  static async updateSubTasks(
    bodySubTasks: Array<UpdateSubTaskRequestDTO>,
    dbSubTasks: Array<UpdateSubTaskRequestDTO>
  ) {
    const subTaskIds = [];
    const subTasksToDelete = [];
    const subTasksToAdd = [];
    const subTasksToUpdate = [];

    bodySubTasks.forEach((subTask) => {
      if (subTask.idSubTask) {
        subTaskIds.push(subTask.idSubTask);

        dbSubTasks.forEach((subTaskDb) => {
          if (subTaskDb.idSubTask === subTask.idSubTask) {
            subTasksToUpdate.push(subTask);
          }
        });

        return;
      }

      subTasksToAdd.push(subTask);
    });

    dbSubTasks.forEach((subTask) => {
      if (!subTaskIds.includes(subTask.idSubTask)) {
        subTasksToDelete.push(subTask);
      }
    });

    const allPromises = [];

    subTasksToDelete.forEach((subTask) => {
      allPromises.push(this.delete(subTask));
    });

    subTasksToAdd.forEach(async (subTask) => {
      allPromises.push(this.create(subTask));
    });

    subTasksToUpdate.forEach(async (subTask) => {
      allPromises.push(this.update(subTask));
    });

    await Promise.all(allPromises);
  }
}
