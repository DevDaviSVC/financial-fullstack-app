import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database!");
    } catch (error) {
        console.log("Error while connecting to database.", error);
    }
};