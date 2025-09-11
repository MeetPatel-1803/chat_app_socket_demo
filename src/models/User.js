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
      defaultValue: null,
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: null,
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: null,
    // },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: Object.values(USER_STATUS),
      defaultValue: USER_STATUS.OFFLINE,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
