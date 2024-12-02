import { Router } from "express";
import { APIError } from "../../utils/api-error";

export const route = Router();

route.get("/:refId", async (req, res, next) => {
  const { refId } = req.params;
  try {
    const data = await deps.Refrigerators.getDetail(refId);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
