import sequelize from "../../config/database";
import { DataTypes } from "sequelize";
import { ROOM_TYPE } from "../utils/constants";
import { User, Room } from "./index.js";

const channelMembersSchema = sequelize.define(
  "rooms",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    channelId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      references: {
        model: Room,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.belongsTo(User, { foreignKey: "createdBy" });

export default channelMembersSchema;
