import { Router } from "express";
import User from "../daos/user/user.js";
import passport from "passport";
import { getRegister, failLogin, getLogout, getLogin, getHome } from "../controllers/loginControllers.js";
import { getProducts } from "../controllers/productsControllers.js"; 

const loginRouter = Router();

const adminRoleChecker = async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.userId });

  if (user.role === "admin") {
    return next();
  } else {
    res.sendStatus(401);
  }
};

loginRouter.route("/home").get(getHome);


/* post(async (req, res) => {

  const newUser = new User(req.body);

  await newUser.save();

  res.json({ email: req.body.email });
}) */


loginRouter.get("/login", getLogin).post("/login", passport.authenticate("login"), (req, res) => {
  console.log('pase el login');
  res.redirect('http://localhost:8080/api/user/home');
});

loginRouter.get('/register', getRegister).post("/register", passport.authenticate("register"), (req, res) => {
  console.log('no envie el redirect');
  res.redirect('http://localhost:8080/api/user/login');
});

export default loginRouter;