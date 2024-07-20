export type UpdateSubTaskRequestDTO = {
  idSubTask: string;
  completed: boolean;
  title: string;
  description: string;
  idTask: string;
};
