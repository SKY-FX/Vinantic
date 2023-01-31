const Image = require('../schemas/image');

const getImages = async () => {
  try {
    const images = await Image.find({});
    return images;
  } catch (error) {
    throw error;
  }
};

module.exports = getImages;