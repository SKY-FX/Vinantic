const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: Buffer,
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
