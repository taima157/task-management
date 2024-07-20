import {
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import connection from "../database/connection";
import User from "./User";
import SubTask from "./SubTask";

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare idTask: CreationOptional<string>;
  declare title: string;
  declare description: string;
  declare completed: CreationOptional<boolean>;
  declare idUser: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare subTasks?: NonAttribute<Array<SubTask>>;

  declare getSubTasks: HasManyGetAssociationsMixin<SubTask>;
  declare addSubTask: HasManyAddAssociationMixin<SubTask, string>;
  declare removeSubTask: HasManyRemoveAssociationMixin<SubTask, string>;
}

Task.init(
  {
    idTask: {
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
    idUser: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    underscored: true,
    tableName: "task",
  }
);

Task.hasMany(SubTask, { foreignKey: "idTask", as: "subTasks" });

export default Task;
