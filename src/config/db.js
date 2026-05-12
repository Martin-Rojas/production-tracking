import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      await mongoose.connect(`mongodb://127.0.0.1:27017/production`);
      console.log("MongoDB connected");
   } catch (error) {
      console.log("Error: ", error.message);
      process.exit(1); // Exit the db if it fails
   }
};

export const disconnectDB = async () => {
   await mongoose.disconnect();
   console.log("MongoDB disconnected");
};
