import mongoose from "mongoose";
// import dotenv from "dotenv";

const connectToDatabase = async () => {
  try {
    // dotenv.config();
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI as string);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
