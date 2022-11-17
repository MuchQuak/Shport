const mongoose = require("mongoose");
const { Schema } = mongoose;

const gamesSchema = new mongoose.Schema(
   {
      sport: {
         type: String,
         required: true,
         trim: true,
      },
      games: [{
         status: Number,
         arena: String,
         maxQtr: Number,
         home: String,
         home_score: Number,
         home_record: String,
         home_code: String,
         away: String,
         away_score: Number,
         away_record: String,
         away_code: String,
         //Maybe Date
         startTimeUTC: String,
         date: Date,
         break_string: String,
         currentQtr: Number,
         clock: String,
         break: Boolean,
         numInSeries: Number,
         homePlayoffs: Boolean,
         awayPlayoffs: Boolean,
         gId: Number,
         sportCode: String
      }],
   },
   {
      collection: "gameCache",
   }
);

const Games = (module.exports = mongoose.model("gameCache", gamesSchema));
