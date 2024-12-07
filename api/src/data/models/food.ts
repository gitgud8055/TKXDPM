import mongoose from "mongoose";

export default mongoose.model(
  "Ingredient",
  new mongoose.Schema({
    name: {
      type: String,
      require: [true, "name is required"],
    },
    image: String,
    unit: [String],
    expired: {
      type: Number,
      require: [true, "Expired time is required"],
    },
  })
);
