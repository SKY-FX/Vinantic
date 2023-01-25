import mongoose from "mongoose";

const bottleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    imageBuffer: {
        type: Buffer,
        contentType: String
    }
});

export const Bottle = mongoose.model("Bottle", bottleSchema);