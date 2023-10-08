import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionObject = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${connectionObject.connection.host}`);
  } catch(err) {
    console.error(`Error ${err.message}`);
    process.exit(1);
  }
};

export default connectDb;