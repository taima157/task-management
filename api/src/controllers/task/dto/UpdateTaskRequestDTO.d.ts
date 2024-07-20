import { UpdateSubTaskRequestDTO } from "./UpdateSubTaskRequestDTO";

export type UpdateTaskRequestDTO = {
  completed: boolean;
  title: string;
  description: string;
  idUser: string;
  subTasks: Array<UpdateSubTaskRequestDTO>;
};
