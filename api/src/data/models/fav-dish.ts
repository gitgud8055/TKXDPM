import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Favourite dish",
  new mongoose.Schema({
    user: {
      type: ObjectId,
      ref: "User",
      require: [true, "user is required"],
    },
    dish: {
      type: ObjectId,
      ref: "Dish",
      require: [true, "dish is required"],
    },
  })
);
