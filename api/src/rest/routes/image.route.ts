import { Router } from "express";
import path from "path";
import { APIError } from "../../utils/api-error";
import fs from "fs";
import sharp from "sharp";

export const router = Router();

router.get("/avatars/:name", async (req, res, next) => {
  const imageURL = path.resolve("./assets/avatars", req.params.name);
  try {
    if (!fs.existsSync(imageURL))
      return next(new APIError(404, "Image not found"));
    const buffer = await fs.readFileSync(imageURL);
    const height = parseInt(req.query.height as string);
    const width = parseInt(req.query.width as string);
    if (height || width) {
      const resized = await sharp(buffer).resize(height, width).toBuffer();
      res.send(resized);
    } else {
      res.send(buffer);
    }
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});

router.get("/attachments/:name", async (req, res, next) => {
  const imageURL = path.resolve("./assets/attachments", req.params.name);
  try {
    if (!fs.existsSync(imageURL))
      return next(new APIError(404, "Image not found"));
    const buffer = await fs.readFileSync(imageURL);
    res.send(buffer);
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
