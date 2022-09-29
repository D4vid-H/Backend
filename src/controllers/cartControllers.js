//import Contenedor from "../contenedores/ContenedorArchivo.js";
import { ProductoDao, CarritoDao, UserDao } from "../daos/index.js";
//import User from "../daos/user/user.schema.js";
let username = "";
let cart_id = "";
//import ProductoDao from "../daos/productos/ProductosDaoArchivo.js";

/* const cartContainer = new Contenedor("../carts.txt");
const prodContainer = new Contenedor("../products.txt"); */

export const getCart = async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.json(await CarritoDao.getAllCart(id));
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const postCart = async (user, req, res) => {
  try {
    console.log(user);
    username = user;
    cart_id = await CarritoDao.addCart(username);
    console.log("devuelve el id del carrito?");
    console.log(cart_id);
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const putCart = async (req, res) => {
  try {
    console.log(cart_id);
    console.log(username);
    console.log(req.body.prod_id);
    const id_prod = Number(req.body.prod_id);
    if (typeof (await ProductoDao.getById(id_prod)) === typeof {}) {
      await CarritoDao.setCart(cart_id, await ProductoDao.getById(id_prod));
      res.redirect("/api/user/home");
    } else {
      res.send(await ProductoDao.getById(id_prod));
    }
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    if (id_prod) {
      res.json(await CarritoDao.deteleProdByCartId(id, id_prod));
    } else {
      res.json({ deleteCartId: await CarritoDao.deleteCart(id) });
    }
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};
