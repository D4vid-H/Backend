import express from 'express';
import { getCart, postCart, putCart, deleteCart } from '../controllers/cartControllers.js';
const cartrouter = express.Router();


cartrouter.post('/', postCart);

cartrouter.delete('/:id', deleteCart);

cartrouter.get('/:id', getCart);

cartrouter.put('/:id/product/:id_prod', putCart);

cartrouter.delete('/:id/product/:id_prod', deleteCart);

export default cartrouter;