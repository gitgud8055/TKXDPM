import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Refrigerator food",
  new mongoose.Schema({
    food: {
      type: ObjectId,
      ref: "Food",
      require: [true, "food is required"],
    },
    quantity: {
      type: Number,
      require: [true, "quantity is required"],
      min: [0, "quantity must be greater than or equal to 0"],
    },
    unit: {
      type: String,
      require: [true, "unit type is required"],
    },
    expired: {
      type: Date,
      require: [true, "expired time is required"],
    },
    note: {
      type: String,
    },
  })
);
