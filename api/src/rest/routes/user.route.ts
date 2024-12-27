import { Router } from "express";
import { APIError } from "../../utils/api-error";
import updateUser from "../middleware/update-user";
import validateUser from "../middleware/validate-user";

export const router = Router();

router.get("/entities", updateUser, validateUser, async (req, res, next) => {
  const user = res.locals.user;
  try {
    const favs = await deps.FavDishes.getFromUser(user._id);

    const [groups, dish] = await Promise.all([
      deps.Groups.getAll(user.groups),
      deps.Dishes.getList(favs.map((x) => x.dish!.toString())),
    ]);
    res.status(200).json({
      groups,
      favs,
      dish,
    });
  } catch (error) {
    console.log(error);
    next(new APIError());
  }
});
