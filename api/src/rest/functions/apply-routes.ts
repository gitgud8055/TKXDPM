import express, { Application, Request, Response, NextFunction } from "express";
import { router as authRouter } from "../routes/auth.route";
import { router as groupsRouter } from "../routes/groups.route";
import { router as ShoppingFoodRouter } from "../routes/shopping-food.router";
import { router as ShoppingListRouter } from "../routes/shopping-list.router";
import { router as mealRouter } from "../routes/meal.route";
import { router as dishRouter } from "../routes/dish.route";
import { router as userRouter } from "../routes/user.route";
import { router as imageRouter } from "../routes/image.route";
import { router as shoppingRouter } from "../routes/shopping-list.router";
import { resolve } from "path";

export default (app: Application, prefix: string) => {
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
  });
  app.use("/assets", express.static(resolve("./assets")));

  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/groups`, groupsRouter);
  app.use(`${prefix}/lists`, ShoppingListRouter);
  app.use(`${prefix}/foods`, ShoppingFoodRouter);
  app.use(`${prefix}/meals`, mealRouter);
  app.use(`${prefix}/dishes`, dishRouter);
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/shopping`, shoppingRouter);
  app.use(`/`, imageRouter);
};
