import express from "express";
import {
  getCart,
  postCart,
  putCart,
  deleteCart,
} from "../controllers/cartControllers.js";
const cartRouter = express.Router();

cartRouter.post("/", postCart);

cartRouter.delete("/:id", deleteCart);

cartRouter.get("/:id/products", getCart);

cartRouter.post("/producto", putCart);

cartRouter.delete("/:id/product/:id_prod", deleteCart);

export default cartRouter;
