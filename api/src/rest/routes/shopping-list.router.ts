import { Router } from "express";
import { APIError } from "../../utils/api-error";
import updateUser from "../middleware/update-user";
import validateUser from "../middleware/validate-user";

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

router.get("/", updateUser, validateUser, async (req, res, next) => {
  console.log(req.query);
  const date = req.query.date;
  const group = req.query.group;
  try {
    if (!group) {
      const data = await deps.ShoppingList.getByDate(
        date!.toString(),
        res.locals.user._id
      );
      // console.log(data[0].list);
      res.status(200).json(data);
    } else {
      const list = await deps.SharedShoppingLists.getByGroupId(group);
      console.log(list);
      const data = await deps.ShoppingList.getByGroup(
        date!.toString(),
        list.map((x) => x.list?.toString())
      );
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    next(new APIError());
  }
});
