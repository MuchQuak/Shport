const axios = require("axios");
const cheerio = require("cheerio");

async function getNews(code) {
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
        .get(host + "/search?q=" + code + "&hl=en-US&gl=US&ceid=US%3Aen")
        .then((response) => {
            let $ = cheerio.load(response.data);
            let news = [];

            $('.xrnccd').each((index, element) => {
                if (index > 3) {
                    return false;
                }

                let newsObj = {}
                newsObj.title = $(element).find(".DY5T1d.RZIKme").text().trim();
                newsObj.url = host + $(element).find("h3 a").attr("href");
                newsObj.source = $(element).find(".wEwyrc.AVN2gc.uQIVzc.Sksgp").text().trim();
                newsObj.timeElapsed = $(element).find(".WW6dff.uQIVzc.Sksgp").text().trim();
                imgLink = $("img").attr("srcset").split(" ");
                newsObj.image = imgLink[0];
                news.push(newsObj);
            });
            console.log(news);
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.getTransactions = getTransactions;