const axios = require("axios");
const cheerio = require("cheerio");

//generic google news scraping, inputs can be anything
async function getNews(sport, code) {
    const host = "https://news.google.com"
    //code = "nfl";
    /*
    [{
    title: "NFL's most underappreciated players: Hunter Renfrow, Chuck Clark among AFC picks",
    url: 'https://news.google.com./articles/CBMiZ2h0dHBzOi8vd3d3Lm5mbC5jb20vbmV3cy9uZmwtcy1tb3N0LXVuZGVyYXBwcmVjaWF0ZWQtcGxheWVycy1odW50ZXItcmVuZnJvdy1jaHVjay1jbGFyay1hbW9uZy1hZmMtcGlja3PSAWdodHRwczovL3d3dy5uZmwuY29tL19hbXAvbmZsLXMtbW9zdC11bmRlcmFwcHJlY2lhdGVkLXBsYXllcnMtaHVudGVyLXJlbmZyb3ctY2h1Y2stY2xhcmstYW1vbmctYWZjLXBpY2tz?hl=en-US&gl=US&ceid=US%3Aen',
    source: 'NFL.com',
    timeElapsed: '8 hours ago',
    image: 'https://lh3.googleusercontent.com/proxy/Fwa9O7kt3MxQDlEZbcY04mLkoNQy6ISLx2cXyiYbZiclGaq4MUpvGXTAEc8DWCVM3n2ZP9NZnRV4OVIt8v16X9C7sMV-cf1WGDoQQkhcm-nvqljZ_8QH_yZETQoc2aYcUfR0pf9D6Qdkww8Ufd0H6mqqVAdPdlnuYcmiRXDcPFHMNEJG=s0-w100-h100-dcARSMrREL'
    }, ...]
    */
    return await axios
      .get(host + "/search?q=" + sport + "%20" + code + "&hl=en-US&gl=US&ceid=US%3Aen")
      .then((response) => {
          let $ = cheerio.load(response.data);
          let news = [];

          $('.xrnccd').each((index, element) => {
              let newsObj = {}
              newsObj.title = $(element).find(".DY5T1d.RZIKme").first().text().trim();
              newsObj.url = host + $(element).find("h3 a").attr("href");
              newsObj.source = $(element).find(".wEwyrc.AVN2gc.uQIVzc.Sksgp").first().text().trim();
              newsObj.timeElapsed = $(element).find(".WW6dff.uQIVzc.Sksgp").first().text().trim();
              news.push(newsObj);
          });

          $(".tvs3Id.QwxBBf").each((index, element) => {
            imgLink = $(element).attr("srcset").split(" ");
            news[index].image = imgLink[2];
          })
          return news;
      })
      .catch((error) => {
          console.log(error);
      });
}


exports.getNews = getNews;