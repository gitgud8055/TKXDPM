import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Shopping food",
  new mongoose.Schema(
    {
      food: {
        type: ObjectId,
        ref: "Food",
        require: [true, "food is required"],
      },
      list: {
        type: ObjectId,
        ref: "Shopping list",
        require: [true, "Shopping list is required"],
        index: true,
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
      bought: {
        type: ObjectId,
        ref: "User",
      },
      note: String,
    },
    { timestamps: true }
  )
);
