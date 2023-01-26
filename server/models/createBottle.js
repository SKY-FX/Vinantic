const Bottle = require('./bottle');

const createBottle = async (bottleData) => {
  try {
    // await saveImageToDb(bottleData, importedPhoto);
    const newBottle = new Bottle(bottleData);
    await newBottle.save();
    console.info('createBottle', newBottle);
    return newBottle;
  } catch (error) {
    throw error;
  }
};

module.exports = createBottle;