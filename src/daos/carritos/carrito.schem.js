import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    user: { type: String, required: true },
    timestamp: { type: Date, required: false },
    products: { type: Array, required: true }
});

const carrito = mongoose.model("carritos", carritoSchema);

export default carrito;