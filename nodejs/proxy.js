const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

const url = "https://newsapi.org/v2/top-headlines?country=in";
const authKey = "fd4ef2f1e25b46a692448544e2d9f3f4";

const headers = {
  Authorization: authKey,
};

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/listArticles", (req, res) => {
  axios
    .get(url, { headers })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
