import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Shopping list",
  new mongoose.Schema(
    {
      name: {
        type: String,
        require: [true, "name is required"],
      },
      owner: {
        type: ObjectId,
        ref: "User",
        require: [true, "owner is required"],
      },
      date: {
        type: Date,
        require: [true, "date is required"],
        index: true,
      },
      note: String,
    },
    { timestamps: true }
  )
);
