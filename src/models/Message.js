import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const messageSchema = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.belongsTo(User, { as: "sender", foreignKey: "senderId" });
messageSchema.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export default messageSchema;
