const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.URI_DB;
const db = mongoose.connect(uriDb);

mongoose.connection.on("connection", (err) => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on("disconnection", (err) => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection for DB disconected and app terminated");
    process.exit(1);
  });
});

module.exports = db;
