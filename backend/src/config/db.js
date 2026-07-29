import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log("Databese connected sucessfully")

  } catch (err) {
    console.log("Database connection failed")
    console.log(err.message)
    process.exit(1)
  }
};

export default connectDB;
