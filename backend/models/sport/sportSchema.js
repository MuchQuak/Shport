const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const sportSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
      trim: true,
    },
    teams: [],
  },
  {
    collection: "sports",
  }
);

const sports = (module.exports = mongoose.model("sports", sportSchema));
