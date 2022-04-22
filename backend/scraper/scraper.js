const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// base example for scraping with cheerio
// run isolated scraper -> node scraper.js

axios
  .get("https://www.espn.com/mlb/")
  .then((response) => {
    let $ = cheerio.load(response.data);

    $(".headlineStack__list li").each((index, element) => {
      console.log($(element).find("a").text().trim());
    });
  })
  .catch((error) => {
    console.log(error);
  });
