import ContenedorSQL from "../../contenedores/ContenedorSQL.js";

export default class ProductoDaoSQL extends ContenedorSQL{
    constructor(){
        super('productos')
    }
};