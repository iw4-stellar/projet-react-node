const express = require("express");
const app = require("./app");
const { sequelize } = require("./models/sqlite/index");
const logger = require("./lib/logger");

const port = process.env.PORT || 8080;

const api = express();

api.use("/api", app);

async function init() {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();

    api.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
