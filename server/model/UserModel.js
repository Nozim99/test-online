import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 120,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  authType: {
    type: String,
    default: "name"
  }
})

export default mongoose.model("User", UserSchema);