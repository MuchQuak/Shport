const mongoose = require("mongoose");
const { Schema } = mongoose;

const gamesSchema = new mongoose.Schema(
    {
      sport: {
        type: String,
        required: true,
        trim: true,
      },
      games: [],
    },
    {
      collection: "gameCache",
    }
);

const Games = (module.exports = mongoose.model("gameCache", gamesSchema));
