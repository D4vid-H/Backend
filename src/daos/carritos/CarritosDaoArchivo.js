import Contenedor from "../../contenedores/ContenedorArchivo.js";

export default class CarritoDaoArchivo extends Contenedor {
  constructor() {
    super("carts.txt");
  }
};

