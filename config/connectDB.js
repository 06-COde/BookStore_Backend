import mongoose from "mongoose";

const connectDB = async () => {
  const connectWithRetry = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(" MongoDB connected successfully");
    } catch (error) {
      console.error(" MongoDB connection error:", error.message);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000); 
    }
  };

  connectWithRetry();

  // Graceful shutdown on app termination
  
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
};

export default connectDB;
