require("dotenv").config();

const express = require("express");
const crypto = require("crypto");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { sequelize } = require("./models/sqlite/index");
const logger = require("./lib/logger");
const chat = require("./controllers/chat");

const port = process.env.SERVER_PORT || 8080;
const api = express();
const server = createServer(api);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

api.use("/api", app);

io.on("connection", async (socket) => {
  // Register all message event handlers
  chat(socket);
});

async function init() {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();

    server.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
