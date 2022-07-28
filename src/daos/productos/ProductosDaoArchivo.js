import Contenedor from "../../contenedores/ContenedorArchivo.js";

export default class ProductoDaoArchivo extends Contenedor {
  constructor() {
    super("products.txt");
  }
};

