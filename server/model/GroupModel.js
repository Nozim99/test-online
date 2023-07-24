import mongoose from "mongoose";

const {ObjectId} = mongoose.Types;

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 120,
  },
  image: String,
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  member: [{
    user: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "player",
    }
  }],
  test: [{
    type: ObjectId,
    ref: "Test",
  }]
}, {timestamps: true})

export default mongoose.model("Group", GroupSchema);