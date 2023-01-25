import { Bottle } from "./bottle";

const createBottle = async (bottleData) => {
    console.info('x', bottleData);
    try {
        const newBottle = new Bottle(bottleData);
        await newBottle.save();
        return newBottle;
    } catch (error) {
        throw error;
    }
};

export default createBottle;
