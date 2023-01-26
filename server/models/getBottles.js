const Bottle = require('./bottle');

const getBottles = async () => {
  try {
    const bottles = await Bottle.find({});
    return bottles;
  } catch (error) {
    throw error;
  }
};

module.exports = getBottles;