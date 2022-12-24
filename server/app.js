const express = require("express");
const fs = require("fs");
const app = express();
const cron = require("node-cron");
const { getNews } = require("./scripts/newsBot");

cron.schedule("0 7 * * *", async () => {
  // once a day : 0 7 * * *
  // every 10 sec : */10 * * * * *
  const headers = await getNews();

  fs.appendFile("./headers.txt", headers, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was written");
  });
});

module.exports = app;
