/* server/index.js */
const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

app.post("/api", ({ body }, res) => {
  const { name } = body;
  res.json({ message: `Hello ${name} from server!` });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});