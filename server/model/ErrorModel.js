import mongoose from "mongoose";

const ErrorSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, {timestamps: true})

export default mongoose.model("Error", ErrorSchema);