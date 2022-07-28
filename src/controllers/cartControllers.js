//import Contenedor from "../contenedores/ContenedorArchivo.js";
import { ProductoDao, CarritoDao } from "../daos/index.js";
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

export const postCart = async (req, res) => {
  try {
    res.json({ cartID: await CarritoDao.addCart() });
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const putCart = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    if (typeof (await ProductoDao.getById(id_prod)) === typeof {}) {
      res.json(
        await CarritoDao.setCart(id, await ProductoDao.getById(id_prod))
      );
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
