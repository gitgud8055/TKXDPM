import { Entity } from "@gitgud/types";
import shoppingList from "./models/shopping-list";
import { Wrapper } from "./wrapper";
import { endOfDay } from "date-fns";
import { startOfDay } from "date-fns";
import mongoose from "mongoose";

export class ShoppingList extends Wrapper {
  public get(id: string) {
    return shoppingList.findById(id);
  }
  public async getDetail(id: string) {
    const [data, items] = await Promise.all([
      this.get(id),
      deps.ShoppingFood.getList(id),
    ]);
    return { ...data?.toObject(), items };
  }
  public create({ name, owner, date, note }: Partial<Entity.ShoppingList>) {
    return shoppingList.create({
      name,
      owner,
      date,
      note,
    });
  }
  public getByDate(date: string, id) {
    return shoppingList.aggregate([
      {
        $match: {
          date: {
            $gte: startOfDay(new Date(date)),
            $lte: endOfDay(new Date(date)),
          },
          owner: id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: "$owner",
      },
      {
        $lookup: {
          from: "shopping foods", // The collection to lookup
          localField: "_id", // Field in the ShoppingFood collection
          foreignField: "list", // Field in the ShoppingList collection
          as: "list", // New field to store the populated list data
        },
      },
      {
        $lookup: {
          from: "foods", // The collection to lookup
          localField: "list.food", // Field in the ShoppingFood collection
          foreignField: "_id", // Field in the Food collection
          as: "foods", // New field to store the populated food data
        },
      },
      // {
      //   $unwind: "$foodDetails", // Unwind the 'foodDetails' array to get individual food objects
      // },
      // {
      //   $unwind: "$shoppingListDetails", // Unwind the 'shoppingListDetails' array to get individual shopping list objects
      // },
      // {
      //   $project: {
      //     foodDetails: 1, // Include the populated foodDetails field
      //     shoppingListDetails: 1, // Include the populated shoppingListDetails field
      //     quantity: 1, // Include the quantity field
      //     unit: 1, // Include the unit field
      //     bought: 1, // Include the bought field
      //     note: 1, // Include the note field
      //     createdAt: 1, // Include the createdAt field
      //     updatedAt: 1, // Include the updatedAt field
      //   },
      // },
    ]);
  }

  public getByGroup(date: string, group: string[]) {
    console.log(group);
    return shoppingList.aggregate([
      {
        $match: {
          date: {
            $gte: startOfDay(new Date(date)),
            $lte: endOfDay(new Date(date)),
          },
          _id: {
            $in: group.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: "$owner",
      },
      {
        $lookup: {
          from: "shopping foods", // The collection to lookup
          localField: "_id", // Field in the ShoppingFood collection
          foreignField: "list", // Field in the ShoppingList collection
          as: "list", // New field to store the populated list data
        },
      },
      {
        $lookup: {
          from: "foods", // The collection to lookup
          localField: "list.food", // Field in the ShoppingFood collection
          foreignField: "_id", // Field in the Food collection
          as: "foods", // New field to store the populated food data
        },
      },
    ]);
  }
  public update({ _id, name, date, note }: Partial<Entity.ShoppingList>) {
    return shoppingList.findByIdAndUpdate(_id, { $set: { name, date, note } });
  }
  public delete(id: string) {
    return shoppingList.findByIdAndDelete(id);
  }
}
