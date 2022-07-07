const express = require("express");
const app = require("./app");
const { sequelize } = require("./models/index");

const port = process.env.PORT || 8080;

const api = express();

api.use("/api", app);

async function init() {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();

    api.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
