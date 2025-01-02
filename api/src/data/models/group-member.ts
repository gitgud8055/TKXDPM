import { group } from "console";
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Group member",
  new mongoose.Schema(
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
      group: {
        type: ObjectId,
        ref: "Group",
      },
    },
    { timestamps: true }
  )
);
