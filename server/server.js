const express = require("express");
const app = express();
const axios = require("axios");

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
