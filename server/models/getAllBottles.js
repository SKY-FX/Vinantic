import { Bottle } from "./bottle";

const getAllBottles = async () => {
    try {
        const bottles = await Bottle.find();
        return bottles;
    } catch (error) {
        throw error;
    }
};

export default getAllBottles;