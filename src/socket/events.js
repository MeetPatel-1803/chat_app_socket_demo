export const sockeEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected.");

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
