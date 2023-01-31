const Bottle = require('../schemas/bottle');

const deleteBottles = async () => {
  try {
    const deletedBottles = await Bottle.deleteMany();
    return deletedBottles;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteBottles;