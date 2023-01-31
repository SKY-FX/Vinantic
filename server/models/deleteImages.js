const Image = require('../schemas/image');


const deleteImages = async () => {
  try {
    const deletedImages = await Image.deleteMany();
    return deletedImages;
  } catch (error) {
    throw error;
  }
}

module.exports = deleteImages;