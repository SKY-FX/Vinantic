import { Bottle } from "./bottle";

const setAllBottles = async (bottles) => {
    try {
        for(let i = 0; i < bottles.length; i++) {
              const bottle = new Bottle(bottles[i]);
            await bottle.save();
        }
    } catch (error) {
        throw error;
    }
};

export default setAllBottles;