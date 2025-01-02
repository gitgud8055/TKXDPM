import { Router } from "express";
import { APIError } from "../../utils/api-error";
import updateUser from "../middleware/update-user";
import validateUser from "../middleware/validate-user";

export const router = Router();

router.get("/entities", updateUser, validateUser, async (req, res, next) => {
  const user = res.locals.user;
  try {
    const [favs, groupIds] = await Promise.all([
      deps.FavDishes.getFromUser(user._id),
      deps.GroupMembers.getByUserId(user._id),
    ]);

    const [groups, dish, members] = await Promise.all([
      deps.Groups.getAll(groupIds.map((x) => x.group!.toString())),
      deps.Dishes.getList(favs.map((x) => x.dish!.toString())),
      deps.GroupMembers.getDetailByGroupId(
        groupIds.map((x) => x.group!.toString())
      ),
    ]);
    res.status(200).json({
      groups,
      favs,
      dish,
      members,
    });
  } catch (error) {
    console.log(error);
    next(new APIError());
  }
});
