import { Bottle } from "./bottle";

const updateBottle = async (_id, updates) => {
    try {
        const updatedBottle = await Bottle.findByIdAndUpdate(_id, updates, {
            new: true
        });
        return updatedBottle;
    } catch (error) {
        throw error;
    }
};

export default updateBottle;