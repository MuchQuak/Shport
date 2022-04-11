const http = require("http");
const host = "newsapi.org";
//apikey = 'ae61e309e55d47469fd1c8e1cc89cf86'
const dotenv = require("dotenv");

async function getNews(req, res) {
  let id = req.params["id"];
  if (id == undefined) id = "sports";
  const options = {
    host: host,
    //path: '/v2/top-headlines?category=sports&country=us&q=' + 'mlb' + '&apikey=' + process.env.NEWSAPI_KEY,
    path:
      "/v2/everything?q=" +
      id +
      "&pageSize=100&Language=en&sortBy=publishedAt&domains=espn.com,cnn.com,sportingnews.com,yahoo.com,cbssports.com,usatoday.com,foxnews.com,reuters.com&apiKey=" +
      process.env.NEWSAPI_KEY,
    method: "GET",
  };
  http
    .request(options, function (response) {
      let body = "";
      response.on("data", function (data) {
        body += data;
      });
      response.on("end", function () {
        res.send(formatNewsData(body));
      });
    })
    .end();
}

function removeTags(str) {
  if (str === null || str === "") return "";
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}

function formatNewsData(responseData) {
  const res = JSON.parse(responseData);
  const new_articles = [];

  for (let i = 1; i < res.totalResults; i++) {
    const article = res.articles[i];
    if (article) {
      const new_article = {};
      new_article.title = article.title ? article.title : "Untitled";
      new_article.description = removeTags(article.description);
      new_article.url = article.url;
      new_article.image = article.urlToImage;
      new_article.date = article.publishedAt.split("T")[0];
      new_article.publishBy = article.source.name;
      new_articles.push(new_article);
    }
  }
  return {
    articles: new_articles,
  };
}

exports.getNews = getNews;
