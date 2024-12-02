import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Dish",
  new mongoose.Schema({
    name: {
      type: String,
      require: [true, "name is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    materials: [
      {
        type: ObjectId,
        ref: "Food",
      },
    ],
    information: String,
  })
);
