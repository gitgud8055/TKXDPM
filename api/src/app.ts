import dotenv from "dotenv";
dotenv.config();
import "@/modules/deps";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(function () {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.error("Error: " + err);
  });
