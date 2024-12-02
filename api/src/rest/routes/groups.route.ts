import { Router } from "express";
import { APIError } from "../../utils/api-error";

export const router = Router();

router.get("/:groupId", async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const [group, shared] = await Promise.all([
      deps.Groups.getWithRef(groupId),
      deps.SharedShoppingLists.getByGroupId(groupId),
    ]);
    res.json({ ...group, shared });
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
