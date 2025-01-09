import { Router } from "express";
import { APIError } from "../../utils/api-error";
import dish from "../../data/models/dish";

export const router = Router();

router.get("/random", async (req, res, next) => {
  console.log("random");
  try {
    const data = await dish.aggregate([
      {
        $match: {
          $expr: {
            $gt: [{ $strLenCP: "$name" }, 0], // Compare the length of the name field
          },
        },
      },
      // Unwind the materials array for easier lookup
      { $unwind: "$materials" },
      // Perform a $lookup to populate the `food` field
      {
        $lookup: {
          from: "foods", // Target collection name (pluralized by MongoDB by default)
          localField: "materials.food", // Field in `materials` to join
          foreignField: "_id", // Field in the `Food` collection to match
          as: "materials.food", // Result field for the joined data
        },
      },
      { $unwind: "$materials.food" },
      // Re-group the materials array
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          images: { $first: "$images" },
          materials: { $push: "$materials" },
          information: { $first: "$information" },
          owner: { $first: "$owner" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      // Optionally populate the `owner` field
    ]);
    // const data = await dish.aggregate([
    //   { $sample: { size: 10 } },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "owner",
    //       foreignField: "_id",
    //       as: "owner",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       localField: "materials",
    //       as: "materials"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "foods",
    //       localField: "materials.food",
    //       foreignField: "_id",
    //       as: "materials.food",
    //     },
    //   },
    // ]);
    console.log(data);
    // return res.json({});
    res.json(data);
  } catch (error) {
    console.log(error);
    next(new APIError());
  }
});

router.get("/:dishId", async (req, res, next) => {
  const { dishId } = req.params;
  try {
    const data = await deps.Dishes.getDetail(dishId);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});

router.get("/favourites", async (req, res, next) => {});

router.get("/favourites/:userId", async (req, res, next) => {});
