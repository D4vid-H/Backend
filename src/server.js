import express from "express";
import passport from "passport";
import passpotLocal from "passport-local";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import prodRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import loginRouter from "./routers/loginRouter.js";
import { UserDao } from "./daos/index.js";
import config from "./config.js";
//import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";
import session from "express-session";
import { getDefault } from "./controllers/defaultControllers.js";

//await mongoose.connect(config.mongo.connectDB);

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

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(reqPassword, dbPassword) {
  return bcrypt.compareSync(reqPassword, dbPassword);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.connectDB,
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      HttpOnly: false,
      secure: false,
      maxAge: 10000,
    },
  })
);

app.set("view engine", "ejs");
app.set("views", __dirname + "../public/views");

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await UserDao.getByUser(username);

      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        username: username,
        password: hashPassword(password),
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        cellphone: req.body.cellphone,
      };

      const createdUser = /* new (newUser) */ await UserDao.addUser(newUser);

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
      const user = await UserDao.getByUser(username); //User.findOne({ username });

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

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/productos", prodRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/user", loginRouter);
app.use("/", getDefault);

export default __dirname;
