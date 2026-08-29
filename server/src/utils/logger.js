import winston from "winston";
const { simple, json, combine, timestamp } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.Console({
      format: simple()
    }),

    new winston.transports.File({
      filename: "logs/combined.logs",
    }),

    new winston.transports.File({
      filename: "logs/error.logs",
      level: "error"
    })

  ]
});

export default logger;