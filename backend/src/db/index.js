import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionPart = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(
      `Successfully Connected DB 😁 DB HOST ${connectionPart.connection.host}`
    );
  } catch (error) {
    console.error("This Error Occur in DB Connection", error);
    process.exit(1);
  }
};
export default connectDB;
