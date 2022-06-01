const mongoose = require("mongoose");
const { Schema } = mongoose;

const standingsSchema = new mongoose.Schema(
    {
      sport: {
        type: String,
        required: true,
        trim: true,
      },
      standings: {},
    },
    {
      collection: "standingsCache",
    }
  );

  const Standings = (module.exports = mongoose.model("standingsCache", standingsSchema));
