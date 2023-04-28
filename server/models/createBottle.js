const Bottle = require("../schemas/bottle");

const createBottle = async (bottleData) => {
  try {
    const newBottle = new Bottle(bottleData);
    await newBottle.save();
    return newBottle;
  } catch (error) {
    throw error;
  }
};

module.exports = createBottle;
