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

// deps.Foods.create({
//   name: "meat",
//   image: "",
//   unit: ["kg", "g"],
//   expired: 7,
// });

// deps.ShoppingFood.create({
//   foodId: "674c2ebb68be7dc6cb258cf5",
//   quantity: 1,
//   unit: "kg",
//   location: "674c30045001ce9bdb5471a7",
//   note: "",
// });

// deps.ShoppingList.create({
//   name: "test",
//   owner: "6743f477a4b73f797697fd7b",
//   date: Date.now(),
//   note: "test note",
//   items: ["674c302fee8aea4246b56a3e"],
// });
