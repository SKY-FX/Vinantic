/* server/index.js */
const express = require("express");
const bodyParser = require('body-parser');
const createBottle = require("./models/createBottle");
const connectToDb = require("./connectToDb");
const getBottles = require("./models/getBottles");
const setBottles = require("./models/setAllBottles");
const deleteBottles = require("./models/deleteBottles");

const PORT = process.env.PORT || 3005;

const app = express();

connectToDb();

app.use(bodyParser.json());

app.post("/vinanticApi/createBottle", ({ body }, res) => {
  const { data: bottleData } = body;

  createBottle(bottleData)
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
});

app.post("/vinanticApi/setBottles", ({ body }, res) => {
  const { data: bottlesData } = body;

  setBottles(bottlesData)
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
});

app.delete("/vinanticApi/deleteBottles", (req, res) => {
  deleteBottles()
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
});

app.get("/vinanticApi/getBottles", (req, res) => {
  getBottles()
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});