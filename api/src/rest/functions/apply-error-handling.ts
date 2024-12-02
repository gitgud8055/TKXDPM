import { Application, Request, Response, NextFunction } from "express";
import { APIError } from "@/utils/api-error";

export default (app: Application) => {
  app.use(
    (error: APIError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";
      res.status(statusCode).json({
        message: message,
      });
    }
  );
};
