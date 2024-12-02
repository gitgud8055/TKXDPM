import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Meal",
  new mongoose.Schema({
    name: {
      type: String,
      require: [true, "name is required"],
    },
    dishes: [
      {
        type: ObjectId,
        ref: "Dish",
      },
    ],
    date: {
      type: Date,
      require: [true, "date is required"],
    },
  })
);
