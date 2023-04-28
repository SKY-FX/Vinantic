/* server/index.js */
const express = require("express");
const bodyParser = require("body-parser");
const createBottle = require("./models/createBottle");
const getBottles = require("./models/getBottles");
const setBottles = require("./models/setAllBottles");
const deleteBottles = require("./models/deleteBottles");
const setImagesFromFolder = require("./models/getImagesFromFolder");
const { connectToDb } = require("./connectToDb");
const deleteImages = require("./models/deleteImages");
const getImages = require("./models/getImages");
const getIsAdminUser = require("./models/getIsAdminUser");
const writeImageInFile = require("./models/writeImageInFile");

const PORT = process.env.PORT || 3005;
const app = express();

(async () => {
  await connectToDb();

  // Do something with gfs
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

  app.post("/vinanticApi/adminLogin", ({ body: userData }, res) => {
    getIsAdminUser(userData)
      .then((result) => res.json({ result }))
      .catch((error) => res.json({ error }));
  });

  app.delete("/vinanticApi/deleteBottles", (req, res) => {
    deleteBottles()
      .then((result) => res.json({ result }))
      .catch((error) => res.json({ error }));
  });

  app.delete("/vinanticApi/deleteImages", (req, res) => {
    deleteImages()
      .then((result) => res.json({ result }))
      .catch((error) => res.json({ error }));
  });

  app.post("/vinanticApi/writeImageInFile", ({ body }, res) => {
    const {
      data: { mandelbrotParams, path },
    } = body;

    writeImageInFile({ mandelbrotParams, path })
      .then((result) => res.json({ result }))
      .catch((error) => res.json({ error }));
  });

  app.get("/vinanticApi/getBottles", (req, res) => {
    getBottles()
      .then((result) => res.json({ result }))
      .catch((error) => res.json({ error }));
  });

  app.get("/vinanticApi/getImages", (req, res) => {
    getImages()
      .then((result) => res.json({ result }))
      .catch((error) => res.json({ error }));
  });

  app.post("/vinanticApi/setImagesFromFolder", (req, res) => {
    setImagesFromFolder()
      .then((result) => res.send({ result }))
      .catch((err) => res.status(500).send({ error: err.message }));
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})();
