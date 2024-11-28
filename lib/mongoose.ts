import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  // if (mongoose.connection?.readyState === 0) {
  //   await mongoose.connect(MONGODB_URI);
  //   console.log("Connected to MongoDB");
  // }

  if (!MONGODB_URI) {
    console.log(!MONGODB_URI);
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (mongoose.connection.readyState) {
    // Already connected
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
