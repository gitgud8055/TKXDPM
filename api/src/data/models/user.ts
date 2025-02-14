import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      username: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      avatar: {
        type: String,
        default: "default.png",
      },
      groups: [
        {
          type: ObjectId,
          ref: "Group",
        },
      ],
      role: {
        type: String,
        enum: ["admin", "user"],
        require: [true, "role is required"],
        trim: true,
      },
    },
    { timestamps: true }
  )
);
