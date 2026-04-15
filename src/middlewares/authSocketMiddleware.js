import { User } from "../models/index.js";
import { verifyUser } from "../services/authService.js";

export const authSocketMiddleware = async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];
    if (!token) {
      return next(new Error("Authentication error: Token not found"));
    }

    const user = await verifyUser(token);
    if (!user) {
      return next(new Error("Authentication error: Unauthorized"));
    }

    socket.user = user;
    await User.update({ socket_id: socket.id }, { where: { id: user.id } });
    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
};
