import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import dbConnection from "./config/database.js";
import { sockeEvents } from "./src/socket/events.js";
import apiRoutes from "./src/routes/index.js";

config();
dbConnection;

const app = express();
app.use(express.json());
const server = createServer(app);

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/", apiRoutes);

sockeEvents(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
