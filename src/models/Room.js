import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";
import { ROOM_TYPE } from "../utils/constants.js";
import User from "./User.js";

const roomSchema = sequelize.define(
  "rooms",
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
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: Object.values(ROOM_TYPE),
      defaultValue: ROOM_TYPE.ONE_TO_ONE,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.belongsTo(User, { foreignKey: "createdBy" });

export default roomSchema;
