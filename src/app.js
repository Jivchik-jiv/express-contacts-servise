const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./api/contacts.js");
const usersRouter = require("./api/users.js");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { rateLimitSettings } = require("./configs/limits.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(rateLimit(rateLimitSettings));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status ? err.status : 500).json({
    status: err.status,
    data: err.data,
    message: err.message,
  });
});

module.exports = app;
