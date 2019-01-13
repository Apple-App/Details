const mongoose = require("mongoose");

if (process.env.NODE_ENV === "production") {
  mongoose.connect(
    process.env.MONGOURI,
    { useNewUrlParser: true }
  );
} else {
  mongoose.connect(
    "mongodb://localhost/movieData",
    { useNewUrlParser: true }
  );
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("mongodb connection established"));

module.exports = db;
