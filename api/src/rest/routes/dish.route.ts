import { Router } from "express";
import { APIError } from "../../utils/api-error";

export const router = Router();

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
