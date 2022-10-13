//apikey = 'ae61e309e55d47469fd1c8e1cc89cf86'
const NewsAPI = require("newsapi");

async function getNews(query) {
    const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
    const news = await newsapi.v2
      .everything({
        q: query,
        sources:
          "bleacher-report, nfl-news, talksport, the-sport-bible, espn, fox-news, fox-sports, nbc-sports",
        domains:
          "espn.com, cnn.com, sportingnews.com, yahoo.com, cbssports.com, usatoday.com, foxnews.com, reuters.com, NBCSports.com",
        language: "en",
        sortBy: "publishedAt",
        page: 1,
      });
   return formatNewsData(news);
}

function removeTags(str) {
  if (str === null || str === "") return "";
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}

function formatNewsData(responseData) {
  const new_articles = [];
  responseData.articles.forEach((article) => {
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
  });
  return new_articles;
}

exports.getNews = getNews;
