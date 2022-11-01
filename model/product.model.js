import { Schema, model } from "npm:mongoose";

const productSchema = new Schema({
  id: { type: String },
  name: { type: String },
  price: { type: Number },
  stock: { type: Number },
});

const Product = model("prod", productSchema);

export default Product;
