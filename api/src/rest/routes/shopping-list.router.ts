import { Router } from "express";
import { APIError } from "../../utils/api-error";

export const router = Router();

router.get("/:listId", async (req, res, next) => {
  const { listId } = req.params;
  console.log(listId);
  try {
    const list = await deps.ShoppingList.getDetail(listId);
    res.json(list);
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
