import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Group",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "name is required"],
      },
      avatar: String,
      owner: {
        type: ObjectId,
        ref: "User",
      },
      description: String,
      refrigerators: [
        {
          type: ObjectId,
          ref: "Refrigerator food",
        },
      ],
    },
    { timestamps: true }
  )
);
