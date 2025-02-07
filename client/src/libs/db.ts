import mongoose from "mongoose";

const connect = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) return;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(mongoUri, {});
    console.log("MongoDB connection successfully established.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error connecting to MongoDB");
    }
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connect;
