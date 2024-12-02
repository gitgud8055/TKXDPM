import mongoose from "mongoose";

export default mongoose.model(
  "Food",
  new mongoose.Schema({
    name: {
      type: String,
      require: [true, "name is required"],
    },
    image: String,
    unit: [String],
    expired: {
      type: Number,
    },
  })
);
