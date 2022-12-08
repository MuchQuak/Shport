const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const playerSchema = new mongoose.Schema(
  {
      title: String,
      description: String,
      url: String,
      image: String,
      date: String,
      publishBy: String,
  },
  {
    collection: "players",
  }
);

const players = (module.exports = mongoose.model("players", playerSchema));
