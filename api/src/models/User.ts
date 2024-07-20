import { Sequelize, DataTypes, Model } from "sequelize";
import connection from "../database/connection";

class User extends Model {}

User.init(
  {
    idUser: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: connection, underscored: true, modelName: "user" }
);

export default User;
