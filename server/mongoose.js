import mongoose from "mongoose";
import dotenv from "dotenv";
import Grid from "gridfs-stream";

dotenv.config();

const connectionString = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;
mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;
let gfs;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("wines-informations");
});

export { db, gfs};