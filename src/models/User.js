import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";
import { USER_STATUS } from "../utils/constants.js";

const userSchema = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: Object.values(USER_STATUS),
      defaultValue: USER_STATUS.OFFLINE,
    },
    socket_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
