const axios = require("axios");

function host(sub, limit) {
  return (
    "https://www.reddit.com/r/" +
    sub +
    "/top.json?nsfw=0&sort=top&t=day&limit=" + limit
  );
}

async function getSubreddit(query, num) {
   return formatPostsData(await axios.get(host(query, num)));
}

function isImage(url) {
  return (
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".png") ||
    url.endsWith(".gif")
  );
}

function formatPostsData(responseData) {
  const newPosts = [];
  responseData.data.data.children
    .map((p) => p.data)
    .forEach((post) => {
      if (post) {
        const newPost = {};
        newPost.subreddit = post.subreddit;
        newPost.title = post.title;
        newPost.description = post.selftext;
        newPost.redditLink = "https://reddit.com" + post.permalink;
        newPost.url = post.url;
        newPost.author = post.author;
        newPost.score = post.score;
        newPost.comments = post.num_comments;
        newPost.image = post.post_hint === "image" || isImage(post.url);
        newPosts.push(newPost);
      }
    });
  return newPosts;
}

exports.getSubreddit = getSubreddit;
