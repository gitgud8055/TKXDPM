import cookieParser from "cookie-parser";
import express, { Application } from "express";
import multer from "multer";
import { resolve } from "path";
import updateUser from "../middleware/update-user";
import validateUser from "../middleware/validate-user";

function setupMulterAttachment(app: Application) {
  const uploadDir = resolve("./assets/attachments");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  app.post(
    "/upload",
    updateUser,
    validateUser,
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      console.log(file);
      res.status(200).json({ name: file?.filename });
    }
  );
}

export default (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  setupMulterAttachment(app);
};
