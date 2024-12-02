import jwt from "jsonwebtoken";
import { APIError } from "../../utils/api-error";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) return next(new APIError(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(new APIError(403, "Forbidden"));
    req.user = user;
    next();
  });
};
