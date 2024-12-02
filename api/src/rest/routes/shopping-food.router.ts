import { Router } from "express";
import { APIError } from "../../utils/api-error";

export const router = Router();

router.get("/:foodId", async (req, res, next) => {
  const { foodId } = req.params;
  try {
    const food = await deps.ShoppingFood.get(foodId);
    res.json(food);
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
