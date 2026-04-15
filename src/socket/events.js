import { authSocketMiddleware } from "../middlewares/authSocketMiddleware.js";
import { handlePrivateMessage } from "../controllers/chatController.js";
import { User } from "../models/index.js";
import { USER_STATUS } from "../utils/constants.js";

export const sockeEvents = async (io) => {
  io.use(authSocketMiddleware);

  io.on("connection", async (socket) => {
    console.log("Socket connected:", socket.id, "User ID:", socket.user?.id);

    // Private One-to-One Message Event
    socket.on("privateMessage", async (data) => {
      await handlePrivateMessage(socket, io, "privateMessage", data);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);
      if (socket.user) {
        await User.update(
          { socket_id: null, status: USER_STATUS.OFFLINE },
          { where: { id: socket.user.id } },
        );
      }
    });
  });
};
