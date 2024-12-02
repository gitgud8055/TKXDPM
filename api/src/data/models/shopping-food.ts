import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Shopping food",
  new mongoose.Schema({
    food: {
      type: ObjectId,
      ref: "Food",
      require: [true, "food is required"],
    },
    quantity: {
      type: Number,
      require: [true, "quantity is required"],
    },
    unit: {
      type: String,
      require: [true, "unit type is required"],
    },
    location: {
      type: ObjectId,
      ref: "Refrigerator",
      require: [true, "Food location is required"],
    },
    note: String,
  })
);
