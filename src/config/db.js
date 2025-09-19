import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.NEW_DB_USERNAME, process.env.NEW_DB_PASSWORD);
  const dbURI = `mongodb+srv://${process.env.NEW_DB_USERNAME}:${process.env.NEW_DB_PASSWORD}@jsedotenvcluster.zmdlira.mongodb.net/${process.env.NEW_DB_NAME}?retryWrites=true&w=majority&appName=jsedotenvcluster`;
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default connectDB;
