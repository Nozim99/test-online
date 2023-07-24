import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4
    })
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}
