import { Router } from "express";
import { APIError } from "../../utils/api-error";
import jwt from "jsonwebtoken";

export const router = Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await deps.User.getByEmail(email);
    if (!user) return next(new APIError(404, "Wrong username or password"));
    if (user.password !== password)
      return next(new APIError(404, "Wrong username or password"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
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
  const { email, password, username, phone } = req.body;
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
