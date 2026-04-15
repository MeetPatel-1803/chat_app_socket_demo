import { Message, User } from "../models/index.js";
import { validatePrivateMessage } from "../validations/chatValidations.js";
import { responseMessages } from "../utils/messages.js";

export const handlePrivateMessage = async (socket, io, eventName, data) => {
  try {
    const error = validatePrivateMessage(data);
    if (error) {
      return socket.emit(eventName, { message: error });
    }

    const { receiverId, message } = data;
    const senderId = socket.user.id;

    // Check if receiver exists
    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return socket.emit(eventName, {
        message: responseMessages.USER_NOT_FOUND,
      });
    }

    // Save message to database
    const savedMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Check if receiver is online and has a valid socket_id
    if (receiver.socket_id) {
      console.log("receiver.socket_id", receiver.socket_id);
      // Emit the message physically to the private socket room/id
      io.to(receiver.socket_id).emit("receivePrivateMessage", {
        message: savedMessage,
        messageText: responseMessages.MESSAGE_SENT_SUCCESS,
      });
    }

    // Acknowledge back to sender
    socket.emit("messageSentAck", {
      message: savedMessage,
      status: "success",
    });
  } catch (error) {
    console.error("Private Message Error:", error);
    socket.emit("errorMessage", { message: responseMessages.INTERNAL_ERROR });
  }
};
