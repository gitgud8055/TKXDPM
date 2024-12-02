import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "Refrigerator",
  new mongoose.Schema({
    foods: [
      {
        type: ObjectId,
        ref: "Shopping food",
      },
    ],
  })
);
