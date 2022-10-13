const news = require("../models/news/newsServices");

async function getNews(req, res) {
   let query = req.params["query"];
   if (query === undefined) query = "sports";

   try {
      const articles = await news.getNews(query);
      res.status(200);
      res.send(articles);
   } catch (err) {
      res.status(500);
      res.send([])
   }
}

exports.getNews = getNews
