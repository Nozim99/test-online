import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 120,
  },
  image: String,
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  test: [{
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    a: {
      type: String,
      required: true,
    },
    b: {
      type: String,
      required: true,
    },
    c: {
      type: String,
      required: true,
    },
    d: {
      type: String,
      required: true,
    },
  }],
  isPrivate: {
    type: Boolean,
    default: false,
  },
  password: String,
  users: [{
    userId: {
      type: ObjectId,
      ref: "User",
    },
    result: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          return value >= 0;
        },
        message: "Result should be a positive number",
      }
    },
    answers: {
      type: [String],
      validate: {
        validator: (value) => {
          return value.length >= 1;
        },
        message: "Answer should have a minimum length of 1",
      }
    },
  }]
}, {timestamps: true})

export default mongoose.model("Test", TestSchema);