const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const newsSchema = new mongoose.Schema(
  {
      title: String,
      description: String,
      url: String,
      image: String,
      date: String,
      publishBy: String,
  },
  {
    collection: "news",
  }
);

const news = (module.exports = mongoose.model("news", newsSchema));
