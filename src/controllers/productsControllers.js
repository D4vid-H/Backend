/* import Contenedor from "../contenedores/ContenedorArchivo.js";
const prodContainer = new Contenedor("../products.txt"); */
import { ProductoDao } from "../daos/index.js";

export const getProducts = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id !== 0) {
      res.json(await ProductoDao.getById(id));
    } else {
      res.json(await ProductoDao.getAll());
    }
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const postProducts = async (req, res) => {
  try {
    const newProducts = req.body;
    res.json({ id: await ProductoDao.add(newProducts) });
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const putProducts = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updateProduct = req.body;
    res.json(await ProductoDao.set(id, updateProduct));
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.json(await ProductoDao.deleteById(id));
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};
