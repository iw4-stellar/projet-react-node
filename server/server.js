const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { sequelize } = require("./models/sqlite/index");
const logger = require("./lib/logger");
const { handleIo } = require("./io");

const port = process.env.SERVER_PORT || 8080;
const api = express();
const server = createServer(api);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

api.use("/api", app);

io.on("connection", (socket) => {
  console.log("new connection");
});

io.on("message", (socket) => {
  console.log(socket);
});

async function init() {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();

    server.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
