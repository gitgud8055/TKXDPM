import { Router } from "express";
import { APIError } from "../../utils/api-error";
import jwt from "jsonwebtoken";
import { REST } from "@gitgud/types";

export const router = Router();

router.post("/login", async (req, res, next) => {
  const { email, password }: REST.To["/login"] = req.body;
  try {
    const user = await deps.User.getByEmail(email);
    if (!user) return next(new APIError(404, "Wrong username or password"));
    if (user.password !== password)
      return next(new APIError(404, "Wrong username or password"));
    const token = deps.User.createToken({ id: user._id });
    res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .json(deps.User.secure(user));
  } catch (e) {
    console.error(e);
    next(new APIError());
  }
});

router.post("/register", async (req, res, next) => {
  const { email, password, username, phone }: REST.To["/register"] = req.body;
  try {
    const user = await deps.User.getByEmail(email);
    if (user) return next(new APIError(406, "User already exists"));
    const info = await deps.User.create({ email, password, username, phone });
    res.status(201).json(deps.User.secure(info));
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("access_token").status(200).json({ message: "Success" });
});

router.post("/change-password", async (req, res, next) => {
  const { email, oldPassword, newPassword }: REST.To["/change-password"] =
    req.body;
  try {
    const user = await deps.User.getByEmail(email);
    if (!user) return next(new APIError(404, "User not found"));
    if (user.password !== oldPassword)
      return next(new APIError(400, "Wrong password"));
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    next(new APIError());
  }
});
