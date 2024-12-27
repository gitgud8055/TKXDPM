import { NextFunction, Request, Response } from "express";
import { APIError } from "../../utils/api-error";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user) {
    return next();
  }
  next(new APIError(401, "User not logged in"));
};
