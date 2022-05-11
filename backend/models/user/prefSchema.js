const mongoose = require("mongoose");
const { Schema } = mongoose;

const prefsSchema = new mongoose.Schema(
  {
    theme: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    sports: {
      following: {
        type: Boolean,
        required: false,
        trim: true,
      },
      NBA: {
        following: {
          type: Boolean,
          required: false,
          trim: true,
        },
        teams: [],
      },
      NFL: {
        following: {
          type: Boolean,
          required: false,
          trim: true,
        },
        teams: [],
      },
      NHL: {
        following: {
          type: Boolean,
          required: false,
          trim: true,
        },
        teams: [],
      },
      MLB: {
        following: {
          type: Boolean,
          required: false,
          trim: true,
        },
        teams: [],
      },
    },
    reddit: {
      teamPosts: {
        type: Intl,
        required: false,
        trim: true,
      },
      leaguePosts: {
        type: Intl,
        required: false,
        trim: true,
      }
    }
  },
  {
    collection: "prefs",
  }
);

const Pref = (module.exports = mongoose.model("pref", prefsSchema));
