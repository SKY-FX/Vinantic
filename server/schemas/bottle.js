const mongoose = require('mongoose');

const bottleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  quality: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const Bottle = mongoose.model("Bottle", bottleSchema);

module.exports = Bottle;