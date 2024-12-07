import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const FoodDetail = new mongoose.Schema({
  food: {
    type: ObjectId,
    ref: "Food",
    require: [true, "food is required"],
  },
  unit: {
    type: String,
    require: [true, "unit is required"],
  },
  quantity: {
    type: Number,
    require: [true, "quantity is required"],
    min: [0, "quantity must be greater than or equal to 0"],
  },
});

export default mongoose.model(
  "Dish",
  new mongoose.Schema(
    {
      name: {
        type: String,
        require: [true, "name is required"],
      },
      images: [
        {
          type: String,
        },
      ],
      materials: [FoodDetail],
      information: String,
      owner: {
        type: ObjectId,
        ref: "User",
        require: [true, "owner is required"],
      },
    },
    { timestamps: true }
  )
);
