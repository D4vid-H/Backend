import express from "express";
import passport from "passport";
import passpotLocal from "passport-local";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import prodrouter from "./routers/productRouter.js";
import cartrouter from "./routers/cartRouter.js";
import loginRouter from "./routers/loginRouter.js";
import User from "./user/user.js";
import config from "./config.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";

await mongoose.connect(config.mongo.connectDB);
/* import dotenv from "dotenv";

dotenv.config(); */

const LocalStrategy = passpotLocal.Strategy;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT;
const app = express();

app.listen(port, (error) => {
  try {
    console.log(`Servidor On-Line escuchando en port: ${port}`);
  } catch (error) {
    console.log(`Se produjo el siguiente error: ${error}`);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "./views/layout/main.hbs"),
  })
);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");



const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        password: password,
        email: req.body.email,
        role: req.body.role,
      };

      const createdUser = new User(newUser);

      await createdUser.save();

      req.user = req.body.email;
      done(null, createdUser);
    } catch (err) {
      console.log("Erro registrando usuario", err);
      done("Erro en registro", null);
    }
  }
);

const loginStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user || !isValidPassword(password, user.password)) {
        return done(null, null);
      }

      done(null, user);
    } catch (err) {
      console.log("Error login", err);
      done("Error login", null);
    }
  }
);

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});


app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/productos", prodrouter);
app.use("/api/carrito", cartrouter);
app.use("/api/user", loginRouter)


export default __dirname;