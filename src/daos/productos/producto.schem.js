import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: false },
    information: { type: String, required: false },
    picturUrl: { type: String, required: false },
    stock: { type: String, required: true },
    price: {type: Number, required: true },
    id: {type: Number, required: true },
    description: { type: String, required: true }
});

const productos = mongoose.model("carrito", productoSchema);

export default productos;



