const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Grid = require('gridfs-stream');
mongoose.set('strictQuery', false);

dotenv.config();

let gfs;

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`,
      { useNewUrlParser: true }
    );
    console.log(`MongoDB connected: ${connection.connection.host}`);

    // if (connection) {
    //   /* Initialize the stream */
    // gfs = Grid(connection.db, mongoose.mongo);
    // gfs.collection('imageMeta');
    // }

    // return ({ gfs });

  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Connect to the database
// connectToDb();

// Export the gfs object
module.exports = connectToDb;