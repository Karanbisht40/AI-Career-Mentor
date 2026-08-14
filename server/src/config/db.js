// Purpose: Centralize the MongoDB connection logic for the application.
// Keeping database setup here supports a clean architecture boundary.
import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};