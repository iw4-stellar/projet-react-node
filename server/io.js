function handleIo(io) {
  io.on("connection", (socket) => {
    console.log("new connection");
  });

  io.on("test", (socket) => {
    console.log(socket);
  });
}

module.exports = {
  handleIo,
};
