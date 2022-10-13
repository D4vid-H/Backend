import { Router } from "express";
//import User from "../daos/user/user.schema.js";
import passport from "passport";
import {
  getRegister,
  failLogin,
  getLogout,
  getLogin,
  getHome,
  getUser,
} from "../controllers/loginControllers.js";
import { getProducts } from "../controllers/productsControllers.js";
import { postCart } from "../controllers/cartControllers.js";
import path from "path";
import sendMailer from "../helper/mail.js";

const loginRouter = Router();

/* const adminRoleChecker = async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.userId });

  if (user.role === "admin") {
    return next();
  } else {
    res.sendStatus(401);
  }
}; */

loginRouter
  .get("/login", getLogin)
  .post("/login", passport.authenticate("login"), (req, res) => {
    postCart(req.body.username);
    //getUser(req);
    //res.redirect("http://localhost:8080/api/user/home");
    res.render(path.join(process.cwd(), "./src/views/home.ejs"), {
      user: req.body.username,
    });
  });

loginRouter.route("/user").get(getUser);

loginRouter.route("/home").get(getHome);

loginRouter
  .get("/register", getRegister)
  .post("/register", passport.authenticate("register"), (req, res) => {
    const options = {
      user: req.body.username,
      names: req.body.name,
      address: req.body.address,
      age: req.body.age,
      cel: req.body.cellphone,
    };
    sendMailer(options);
    res.redirect("http://localhost:8080/api/user/login");
  });

/* post(async (req, res) => {
  
    const newUser = new User(req.body);
  
    await newUser.save();
  
    res.json({ email: req.body.email });
  }) */

export default loginRouter;
