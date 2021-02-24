import { get } from 'axios';
import { randomizer } from "./utils";

const {
    NEWS_API_KEY
  } = process.env;
  
const URL = `https://newsapi.org/v2/everything?excludeDomains=mashable.com,techcrunch.com,slashdot.org,engadget.com&sortBy=relevancy&q=programming%20and%20language&apiKey=${NEWS_API_KEY}`;

function postTweet(msg, imgUrl) {
    var request = require("request").defaults({ encoding: null });

    request.get(imgUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        img = Buffer.from(body).toString("base64");
        let tweeter = require("./tweet-module");
        let _ = new tweeter.TweetMediaPoster(msg, img);
      }
    });
}

get(URL)
  .then(response => {
    let data = response.data;
    const randomId = randomizer(0, Object.keys(data.articles).length);
    let title = data.articles[randomId].title;
    let urlToImage = data.articles[randomId].urlToImage;

    postTweet(title, urlToImage);
  })
  .catch(error => {
    console.log(error);
  });
