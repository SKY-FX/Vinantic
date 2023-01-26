const Bottle = require('./bottle');

const setBottles = async (bottles) => {
  // console.info('setBottles', bottles);
  try {
    let bottlesResult = [];
    for(let i = 0; i < bottles.length; i++) {
      const bottle = new Bottle(bottles[i]);
      await bottle.save();
      bottlesResult.push(bottle);
    }
    return bottlesResult;
  } catch (error) {
    throw error;
  }
};

module.exports = setBottles;
