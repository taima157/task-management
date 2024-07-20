import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import connection from "../database/connection";
import Task from "./Task";

class SubTask extends Model<
  InferAttributes<SubTask>,
  InferCreationAttributes<SubTask>
> {
  declare idSubTask: CreationOptional<string>;
  declare title: string;
  declare description: string;
  declare completed: boolean;
  declare idTask: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SubTask.init(
  {
    idSubTask: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    idTask: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: Task,
        key: "id_task",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    underscored: true,
    tableName: "sub_task",
  }
);

export default SubTask;
