import { CreateSubTaskRequestDTO } from "./CreateSubTaskRequestDTO";

export type CreateTaskRequestDTO = {
  title: string;
  description: string;
  idUser: string;
  subTasks: Array<CreateSubTaskRequestDTO>;
};
