import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const refFood = new mongoose.Schema(
  {
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
    note: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

refFood.virtual("expired").get(function () {
  return this.populated("food")
    ? addDays(this.createdAt, this.food.duration)
    : null;
});

export default mongoose.model("Refrigerator food", refFood);
