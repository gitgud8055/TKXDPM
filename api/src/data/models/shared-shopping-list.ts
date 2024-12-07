import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Shared shopping list",
  new mongoose.Schema({
    group: {
      type: ObjectId,
      ref: "Group",
      require: [true, "group is required"],
    },
    list: {
      type: ObjectId,
      ref: "Shopping list",
      require: [true, "Shopping list is required"],
    },
  })
);
