const winston = require("winston");
require("winston-mongodb");

const { mongoose } = require("../models/mongo");

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.MongoDB({
      db: mongoose.connection,
      collection: "logs",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: format,
    })
  );
}

module.exports = logger;