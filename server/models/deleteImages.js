const Image = require('../schemas/image');


const deleteImages = async () => {
  try {
    const deletedImages = await Image.deleteMany();
    console.info('deleteBottles', deletedImages);
    return deletedImages;
  } catch (error) {
    throw error;
  }
}

module.exports = deleteImages;