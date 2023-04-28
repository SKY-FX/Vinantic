const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);

dotenv.config();

let connection;

const connectToDb = async () => {
  if (connection) return Promise.resolve(connection);

  try {
    connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`,
      { useNewUrlParser: true }
    );

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return Promise.resolve(connection);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectToDb };
