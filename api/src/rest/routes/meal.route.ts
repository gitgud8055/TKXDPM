import { Router } from "express";
import { APIError } from "../../utils/api-error";

export const router = Router();

router.get("/:mealId", async (req, res, next) => {
  const { mealId } = req.params;
  try {
    const data = await deps.Meals.getDetail(mealId);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
