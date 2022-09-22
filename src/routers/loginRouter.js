import { Router } from "express";
import User from "../user/user.js";
import passport from "passport";

const loginRouter = Router();

const adminRoleChecker = async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.userId });

  if (user.role === "admin") {
    return next();
  } else {
    res.sendStatus(401);
  }
};

loginRouter.route("/user").post(async (req, res) => {

  const newUser = new User(req.body);

  await newUser.save();

  res.json({ email: req.body.email });
});



loginRouter.route("/login", passport.authenticate("login"), (req, res) => {
  res.sendStatus(200);
});

loginRouter.route("/register", passport.authenticate("register"), (req, res) => {
  res.sendStatus(200);
});

export default loginRouter;