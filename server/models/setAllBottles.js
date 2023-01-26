const Bottle = require('./bottle');

const setBottles = async (bottles) => {
  // console.info('setBottles', bottles);
  try {
    for(let i = 0; i < bottles.length; i++) {
      console.info('U CAN', { i, result: bottles[i] });
      const bottle = new Bottle(bottles[i]);
      await bottle.save();
    }
    return { ok: 'true' };
  } catch (error) {
    console.info('ERRRROR');
    throw error;
  }
};

module.exports = setBottles;
