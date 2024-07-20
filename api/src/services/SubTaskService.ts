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
    await SubTask.update(updateSubTaskRequestDTO, {
      where: { idSubTask: updateSubTaskRequestDTO.idSubTask },
    });
  }

  static async delete(updateSubTaskRequestDTO: UpdateSubTaskRequestDTO) {
    await (await this.findById(updateSubTaskRequestDTO.idSubTask)).destroy();
  }

  static async updateSubTasks(
    bodySubTasks: Array<UpdateSubTaskRequestDTO>,
    dbSubTasks: Array<UpdateSubTaskRequestDTO>
  ) {
    const dbSubTasksMap = new Map(
      dbSubTasks.map((subTask) => [subTask.idSubTask, subTask])
    );

    const { subTasksToAdd, subTasksToUpdate, subTaskIds } = bodySubTasks.reduce(
      (acc, subTask) => {
        if (subTask.idSubTask) {
          acc.subTaskIds.add(subTask.idSubTask);

          if (dbSubTasksMap.has(subTask.idSubTask)) {
            acc.subTasksToUpdate.push(subTask);
          }
        } else {
          acc.subTasksToAdd.push(subTask);
        }

        return acc;
      },
      {
        subTasksToAdd: [],
        subTasksToUpdate: [],
        subTaskIds: new Set(),
      }
    );

    const subTasksToDelete = dbSubTasks.filter(
      (subTask) => !subTaskIds.has(subTask.idSubTask)
    );

    await Promise.all([
      ...subTasksToDelete.map((subTask) => this.delete(subTask)),
      ...subTasksToAdd.map((subTask) => this.create(subTask)),
      ...subTasksToUpdate.map((subTask) => this.update(subTask)),
    ]);
  }
}
