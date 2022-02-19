const http = require('http');
const host = 'newsapi.org'
//apikey = 'ae61e309e55d47469fd1c8e1cc89cf86'
const dotenv = require('dotenv');


async function getNews(req, res) {
    let id = req.params['id'];
    if (id == undefined)
        id = 'sports'
    const options = {
      host: host,
      path: '/v2/top-headlines?country=us&category=sports&apikey=' + process.env.NEWSAPI_KEY,
      //path: '/v2/everything?q=' + id + '&apiKey=' + process.env.NEWSAPI_KEY, 
      method: 'GET'
    }
    http.request(options, function (response) {
      let body = '';
      response.on('data', function (data) {
          body += data;
      });
      response.on('end', function () {
          res.send(formatNewsData(body));
      });
    }).end();
  }

  function formatNewsData(responseData) {
    const articles = JSON.parse(responseData).articles;
    const new_articles = [];
    for (let i = 0; i < 6; i++) {
        const article = articles[i];
        const new_article = {}
        new_article.title = article.title;
        new_article.description = article.description;
        new_article.url = article.url;
        new_article.image = article.urlToImage;
        new_article.date = article.publishedAt.split('T')[0];
        new_article.publishBy = article.source.name;
    
        new_articles.push(new_article);
    }
    return {
        articles: new_articles
    };
  }

  exports.getNews = getNews;