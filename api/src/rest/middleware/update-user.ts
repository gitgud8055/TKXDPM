import jwt from "jsonwebtoken";
import { APIError } from "../../utils/api-error";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) return next(new APIError(401, "Unauthorized"));
  try {
    const user = deps.User.decodeToken(token);
    req.user = await deps.User.get(user);
  } catch (error) {
    next(new APIError(403, "Forbidden"));
  }
};
