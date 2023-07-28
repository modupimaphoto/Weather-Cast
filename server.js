

require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
})
app.get("*", (req, res) => {
  res.render("404");
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port}.`);
})
