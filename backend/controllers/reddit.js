const reddit = require("../models/reddit/redditServices");

async function getSubreddit(req, res) {
  const query = req.params["query"];
  const num = req.params["num"] !== undefined ? req.params["num"] : 1;
   try {
   if(num <= 0) {
      res.status(400);
      res.send([]);
   } else {
      const posts = await reddit.getSubreddit(query, num);
      res.status(200);
      res.send(posts);
   } 
   } catch(err) {
      res.status(500);
      res.send([]);
   }
}

exports.getSubreddit = getSubreddit;
